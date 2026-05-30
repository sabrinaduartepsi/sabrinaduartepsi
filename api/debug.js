export default async function handler(req, res) {
  console.log('TALLY_BODY:', JSON.stringify(req.body));
  return res.status(200).json({ received: true, body: req.body });
}
