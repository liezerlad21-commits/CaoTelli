// MP PIX API direta — gera QR code no próprio site (sem redirect)
const crypto = require('crypto');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { items, total, payer } = body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) {
      console.error('❌ MP_ACCESS_TOKEN não configurado');
      return res.status(500).json({ error: 'Token Mercado Pago não configurado' });
    }

    const totalNum = Number(total);
    if (!totalNum || totalNum <= 0) {
      return res.status(400).json({ error: 'Total inválido' });
    }

    // Dados do pagador — se não vier do frontend, usa placeholder válido
    const payerEmail = (payer && payer.email) || 'cliente@caotelli.com.br';
    const payerFirstName = (payer && payer.first_name) || 'Cliente';
    const payerLastName = (payer && payer.last_name) || 'CaoTelli';
    // CPF: MP exige formato válido. Se não vier, usa CPF genérico de teste (não é validado como real).
    const payerCpf = ((payer && payer.cpf) || '19119119100').replace(/\D/g, '');

    const descricao = items
      .map(i => `${i.name} x${i.quantity}`)
      .join(', ')
      .substring(0, 250);

    const idempotencyKey = crypto.randomUUID();

    const paymentBody = {
      transaction_amount: Number(totalNum.toFixed(2)),
      description: `Pedido CãoTelli - ${descricao}`,
      payment_method_id: 'pix',
      payer: {
        email: payerEmail,
        first_name: payerFirstName,
        last_name: payerLastName,
        identification: {
          type: 'CPF',
          number: payerCpf,
        },
      },
      external_reference: `CAOTELLI-${Date.now()}`,
    };

    console.log('📤 Criando pagamento PIX...', { total: totalNum, payer: payerEmail });

    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(paymentBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ Erro MP ${response.status}:`, JSON.stringify(data).substring(0, 300));
      return res.status(response.status).json({
        error: 'Erro ao gerar PIX no Mercado Pago',
        detail: data.message || data.error || JSON.stringify(data).substring(0, 200),
      });
    }

    const poi = data.point_of_interaction;
    const txData = poi && poi.transaction_data;
    const qrText = (txData && txData.qr_code) || '';
    const qrBase64 = (txData && txData.qr_code_base64) || '';

    if (!qrText) {
      console.error('❌ MP não retornou QR code:', JSON.stringify(data).substring(0, 300));
      return res.status(500).json({ error: 'MP não retornou QR code', detail: 'Resposta sem qr_code' });
    }

    console.log('✅ PIX gerado — payment ID:', data.id);

    return res.status(200).json({
      paymentId: data.id,
      qrText,
      qrImageBase64: qrBase64 ? `data:image/png;base64,${qrBase64}` : null,
      total: totalNum,
      status: data.status,
      expiresAt: (txData && txData.expiration_date) || null,
    });

  } catch (err) {
    console.error('❌ Erro interno checkout MP PIX:', err);
    return res.status(500).json({
      error: 'Erro ao processar pagamento. Tente novamente.',
      detail: err.message,
    });
  }
};
