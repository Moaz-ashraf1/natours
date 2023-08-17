const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

router
  .route('/tour/:slug')
  .get(authController.isLoggedIn, viewController.getTour);

router
  .route('/')
  .get(
    bookingController.createBookingCheckout,
    authController.isLoggedIn,
    viewController.getOverview
  );

router
  .route('/my-tours')
  .get(authController.protect, viewController.getBookingTours);
router.route('/login').get(authController.isLoggedIn, viewController.Login);
router.route('/me').get(authController.protect, viewController.getAccount);
module.exports = router;
