module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    const totalCents = Math.round(Number(total) * 100);

    // Expira em 24h
    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    expiration.setMilliseconds(0);
    const expirationStr = expiration.toISOString().replace('Z', '-03:00');

    const isSandbox = process.env.PAGBANK_ENV !== 'production';
    const baseUrl = isSandbox
      ? 'https://sandbox.api.pagseguro.com'
      : 'https://api.pagseguro.com';

    const body = {
      reference_id: `caotelli-${Date.now()}`,
      customer: {
        name: 'Cliente CaoTelli',
        email: 'cliente@caotelli.com.br',
        tax_id: '12345678909', // CPF generico para sandbox
      },
      items: items.map((i, idx) => ({
        reference_id: `item-${idx + 1}`,
        name: String(i.name).substring(0, 64),
        quantity: Number(i.quantity),
        unit_amount: Math.round(Number(i.price) * 100),
      })),
      qr_codes: [{
        amount: { value: totalCents },
        expiration_date: expirationStr,
      }],
      notification_urls: ['https://caotelli.vercel.app/api/webhook'],
    };

    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAGBANK_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro PagBank:', JSON.stringify(data));
      return res.status(500).json({ error: 'Erro ao gerar PIX', details: data });
    }

    const qrCode = data.qr_codes?.[0];
    if (!qrCode) {
      return res.status(500).json({ error: 'QR Code nao gerado pelo PagBank' });
    }

    const qrImageUrl = qrCode.links?.find(l => l.rel === 'QRCODE.PNG')?.href || null;

    return res.status(200).json({
      orderId: data.id,
      qrText: qrCode.text,
      qrImageUrl,
      total: totalCents / 100,
    });

  } catch (err) {
    console.error('Erro interno checkout:', err);
    return res.status(500).json({ error: 'Erro interno ao gerar pagamento' });
  }
};
