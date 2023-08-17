const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./reviewRoute');
const bookingRouter = require('./bookingRoute');
const router = express.Router();

// router.param('id', tourController.checkID);

router.use('/:tourId/review', reviewRouter);
router.use('/:tourId/bookings', bookingRouter);
router
  .route('/tour-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getTourWithin);
router.route('/distance/:latlng/unit/:unit').get(tourController.getDistances);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourPhoto,
    tourController.resizeTourPhoto,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
