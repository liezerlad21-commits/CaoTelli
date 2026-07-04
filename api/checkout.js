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

    // MOCK QR CODE — Remove quando PagBank estiver funcionando
    const mockOrderId = `CAOTELLI-${Date.now()}`;
    const mockQrText = `00020126360014br.gov.bcb.brcode0136123e4567-e12b-12d1-a456-426655440000520400005303986540510.005802BR5913CAOTELLI6009SAO PAULO62410503***63041D3F`;
    const mockQrImageUrl = `https://quickchart.io/qr?text=${encodeURIComponent(mockQrText)}&size=160`;

    return res.status(200).json({
      orderId: mockOrderId,
      qrText: mockQrText,
      qrImageUrl: mockQrImageUrl,
      total: Number(total),
    });

  } catch (err) {
    console.error('Erro interno checkout:', err);
    return res.status(500).json({ error: 'Erro interno ao gerar pagamento' });
  }
};
