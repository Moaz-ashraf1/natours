const express = require('express');

const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');
const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(authController.restrictTo(''), bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
