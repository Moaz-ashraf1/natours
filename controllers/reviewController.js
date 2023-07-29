const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setTourAndUser = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
exports.getAllReview = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
