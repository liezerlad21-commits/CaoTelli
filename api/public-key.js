// Retorna a public key do Mercado Pago pra inicializar o SDK.js no frontend.
// Public key é seguro expor (não permite fazer pagamentos, só tokenizar cartão).
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // cache 1h

  const publicKey = process.env.MP_PUBLIC_KEY;
  if (!publicKey) {
    return res.status(500).json({ error: 'MP_PUBLIC_KEY não configurada na Vercel' });
  }
  return res.status(200).json({ publicKey });
};
