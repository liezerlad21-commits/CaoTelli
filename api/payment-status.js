// Consulta o status de um pagamento no Mercado Pago
// Usado pelo polling do frontend enquanto o modal PIX está aberto
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Use GET' });

  const paymentId = (req.query && req.query.id) || '';
  if (!paymentId || !/^\d+$/.test(String(paymentId))) {
    return res.status(400).json({ error: 'paymentId inválido' });
  }

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Token Mercado Pago não configurado' });
  }

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Erro ao consultar pagamento',
        detail: data.message || data.error,
      });
    }

    // Retorna apenas o mínimo (evita expor dados sensíveis)
    return res.status(200).json({
      paymentId: data.id,
      status: data.status,               // approved, in_process, pending, rejected, cancelled, refunded
      statusDetail: data.status_detail,
      amount: data.transaction_amount,
      method: data.payment_method_id,
      dateApproved: data.date_approved,
    });
  } catch (err) {
    console.error('Erro payment-status:', err);
    return res.status(500).json({ error: 'Erro interno', detail: err.message });
  }
};
