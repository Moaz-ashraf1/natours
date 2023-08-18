import axios from 'axios';

export const bookTour = async tourId => {
  try {
    const stripe = Stripe(
      'pk_test_51NdTGdH8dEDTHR0nXdEXEhm0RSmaGoKJWFnneWCcd1lolmRDpsps6yzDBeYOAXd30JrdhOq1VbquCBhLm0l1rzbP00yzHKVkSH'
    );

    // Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (error) {
    console.log(error);
    alert('error', error);
  }
};
