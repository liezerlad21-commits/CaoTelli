// Webhook do Mercado Pago — recebe notificações de mudança de status de pagamento
// Configuração no MP: Suas integrações → CãoTelli Ecommerce → Webhooks
//   URL:     https://cao-telli.vercel.app/api/mp-webhook
//   Eventos: Pagamentos (payment)
//
// IMPORTANTE: nunca confie no body diretamente. Sempre consulte a MP com o ID
// pra confirmar o status real (evita ataques de forjar aprovação).
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // MP às vezes faz GET pra testar o endpoint — responde 200
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, service: 'mp-webhook' });
  }

  if (req.method !== 'POST') return res.status(405).end();

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    // MP manda de várias formas — cobrimos as duas:
    //   { type: 'payment', data: { id: '123' } }        (v2, padrão atual)
    //   { topic: 'payment', resource: 'https://.../123' } (v1, legado)
    let paymentId = null;
    if (body.data && body.data.id) paymentId = String(body.data.id);
    else if (body.resource) paymentId = String(body.resource).split('/').pop();
    else if (req.query && req.query['data.id']) paymentId = String(req.query['data.id']);
    else if (req.query && req.query.id) paymentId = String(req.query.id);

    const type = body.type || body.topic || (req.query && req.query.type) || 'unknown';

    console.log('🔔 Webhook MP recebido:', { type, paymentId, hasBody: !!body });

    // Só nos interessam eventos de pagamento
    if (!paymentId || (type !== 'payment' && type !== 'payment.updated')) {
      return res.status(200).json({ ignored: true, type });
    }

    // Consulta a MP pra confirmar o status real
    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) {
      console.error('❌ MP_ACCESS_TOKEN não configurado');
      return res.status(200).json({ received: true, error: 'token' }); // 200 pra MP não reenviar
    }

    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const payment = await response.json();

    if (!response.ok) {
      console.error(`❌ Erro consultando pagamento ${paymentId}:`, payment);
      return res.status(200).json({ received: true, error: 'lookup_failed' });
    }

    console.log('✅ Pagamento consultado:', {
      id: payment.id,
      status: payment.status,
      statusDetail: payment.status_detail,
      amount: payment.transaction_amount,
      externalRef: payment.external_reference,
    });

    // TODO: Escalada futura — atualizar Firestore direto daqui via Firebase Admin SDK
    // Por enquanto, o frontend (polling) faz o update no Firestore.

    return res.status(200).json({
      received: true,
      paymentId,
      status: payment.status,
    });
  } catch (err) {
    console.error('❌ Erro no webhook:', err);
    // Retorna 200 pra MP não ficar reenviando indefinidamente
    return res.status(200).json({ received: true, error: err.message });
  }
};
