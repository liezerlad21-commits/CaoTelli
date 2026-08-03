const { MercadoPagoConfig, Preference } = require('mercadopago');

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

    const token = process.env.MP_ACCESS_TOKEN;

    console.log('🔐 Token MP:', token ? `${token.substring(0, 15)}...` : 'NÃO ENCONTRADO');

    if (!token) {
      console.error('❌ MP_ACCESS_TOKEN não configurado nas env vars');
      return res.status(500).json({ error: 'Token Mercado Pago não configurado' });
    }

    const totalNum = Number(total);
    if (!totalNum || totalNum <= 0) {
      return res.status(400).json({ error: 'Total inválido' });
    }

    const siteUrl = 'https://liezerlad21-commits.github.io/CaoTelli';

    // Um único item com o total final (frete + desconto já aplicados no frontend).
    // Descrição lista os produtos do carrinho.
    const descricao = items
      .map(i => `${i.name} x${i.quantity}`)
      .join(', ')
      .substring(0, 250);

    const client = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(client);

    const preferenceBody = {
      items: [
        {
          id: `CAOTELLI-${Date.now()}`,
          title: `Pedido CãoTelli (${items.length} ${items.length === 1 ? 'item' : 'itens'})`,
          description: descricao,
          quantity: 1,
          unit_price: Number(totalNum.toFixed(2)),
          currency_id: 'BRL',
        },
      ],
      back_urls: {
        success: `${siteUrl}/?pagamento=success`,
        failure: `${siteUrl}/?pagamento=failure`,
        pending: `${siteUrl}/?pagamento=pending`,
      },
      auto_return: 'approved',
      statement_descriptor: 'CAOTELLI',
      external_reference: `CAOTELLI-${Date.now()}`,
    };

    const result = await preference.create({ body: preferenceBody });

    console.log('✅ Preferência criada:', result.id);

    return res.status(200).json({
      preferenceId: result.id,
      initPoint: result.init_point,
      total: totalNum,
    });

  } catch (err) {
    console.error('❌ Erro interno checkout MP:', err);
    return res.status(500).json({
      error: 'Erro ao processar pagamento. Tente novamente.',
      detail: err.message,
    });
  }
};
