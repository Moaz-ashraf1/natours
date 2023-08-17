const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = model =>
  catchAsync(async (req, res, next) => {
    const doc = await model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = model =>
  catchAsync(async (req, res, next) => {
    const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

exports.createOne = model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newDoc
      }
    });
  });

exports.getOne = (model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

exports.getAll = model =>
  catchAsync(async (req, res, next) => {
    let filter;
    if (req.params.userId) {
      // For user bookings
      filter = { user: req.params.userId };
    } else if (req.params.tourId) {
      // For tour bookings
      filter = { tour: req.params.tourId };
    } else {
      // No specific user or tour specified, return all bookings
      filter = {};
    }

    const features = new APIFeatures(model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs
      }
    });
  });
