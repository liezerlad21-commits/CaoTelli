const { MercadoPagoConfig, Preference } = require('@mercadopago/sdk-node');

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

module.exports = async (req, res) => {
  // CORS — permite chamadas do GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', 'https://liezerlad21-commits.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    const preference = await new Preference(client).create({
      body: {
        items: items.map(i => ({
          id: String(i.id),
          title: i.name,
          quantity: Number(i.quantity),
          unit_price: Number(i.price),
          currency_id: 'BRL',
        })),
        back_urls: {
          success: 'https://liezerlad21-commits.github.io/CaoTelli/?pagamento=sucesso',
          failure: 'https://liezerlad21-commits.github.io/CaoTelli/?pagamento=falha',
          pending: 'https://liezerlad21-commits.github.io/CaoTelli/?pagamento=pendente',
        },
        auto_return: 'approved',
        statement_descriptor: 'CaoTelli PetShop',
        notification_url: 'https://caotelli.vercel.app/api/webhook', // opcional — para receber confirmação
      },
    });

    return res.status(200).json({ url: preference.init_point });
  } catch (err) {
    console.error('Erro ao criar preferência MP:', err);
    return res.status(500).json({ error: 'Erro ao gerar link de pagamento' });
  }
};
