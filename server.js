require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Test Product',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html',
      cancel_url: 'http://localhost:3000/cancel.html',
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
