const stripe = Stripe('pk_test_51PxIXo2NMOaW4kiZqMfKufX9ou9wboVGb5f6CD10Pd50CNOvs5XkNkrd9a6GtPrXwCbKNGQhd3wd98U4GZ96Re9g00rtNL3hmZ');

const checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', () => {
  fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(session => {
    return stripe.redirectToCheckout({ sessionId: session.id });
  })
  .then(result => {
    if (result.error) {
      alert(result.error.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
