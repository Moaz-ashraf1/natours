const express = require('express');

const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const router = express.Router({ mergeParams: true });

// POST tour/1234/reviews
// GET  tour/1234/reviews
// GET  tour/1234/reviews/5678
router.use(authController.protect);
router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourAndUser,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
