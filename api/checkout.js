module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  try {
    const { items, total } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    const totalCents = Math.round(Number(total) * 100);
    const token = process.env.PAGBANK_TOKEN;

    if (!token) {
      console.error('PAGBANK_TOKEN não configurado nas env vars');
      return res.status(500).json({ error: 'Token PagBank não configurado' });
    }

    // Preparar pedido para PagBank
    const pedido = {
      reference_id: `CAOTELLI-${Date.now()}`,
      customer: {
        name: 'Cliente CãoTelli',
        email: 'contato@caotelli.com.br',
        tax_id: '00000000000000',
      },
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unit_amount: Math.round(item.price * 100),
      })),
      amount: {
        value: totalCents,
        currency: 'BRL',
      },
      qr_codes: [
        {
          amount: {
            value: totalCents,
          },
        },
      ],
    };

    // Chamar API PagBank (produção)
    const response = await fetch('https://api.pagseguro.com/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Erro PagBank - Status:', response.status, 'Resposta:', data);
      // Fallback para mock se API falhar
      const mockOrderId = `CAOTELLI-${Date.now()}`;
      const mockQrText = `00020126360014br.gov.bcb.brcode0136123e4567-e12b-12d1-a456-426655440000520400005303986540510.005802BR5913CAOTELLI6009SAO PAULO62410503***63041D3F`;
      const mockQrImageUrl = `https://quickchart.io/qr?text=${encodeURIComponent(mockQrText)}&size=160`;
      return res.status(200).json({
        orderId: mockOrderId,
        qrText: mockQrText,
        qrImageUrl: mockQrImageUrl,
        total: Number(total),
        warning: `QR Code mock (API falhou: ${response.status} - ${data.message || 'erro desconhecido'})`,
      });
    }

    // Extrair QR code real da resposta
    const qrCode = data.qr_codes && data.qr_codes[0];
    const qrText = qrCode?.text || '';
    const qrImageUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrText)}&size=160`;

    return res.status(200).json({
      orderId: data.id,
      qrText: qrText,
      qrImageUrl: qrImageUrl,
      total: Number(total),
      status: data.status,
    });

  } catch (err) {
    console.error('Erro interno checkout:', err);
    return res.status(500).json({ error: 'Erro ao processar pagamento. Tente novamente.' });
  }
};
