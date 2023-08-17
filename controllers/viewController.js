const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const Booking = require('./../models/bookingModel');

exports.getOverview = async (req, res) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
};
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour
    });
});
exports.Login = async (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('login', {
      title: 'Log into your account'
    });
};
exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};
exports.getBookingTours = async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id });

  const toursId = bookings.map(ele => ele.tour._id);

  const tours = await Tour.find({ _id: { $in: toursId } });
  res.render('overview', { title: 'My tours', tours });
};
exports.updateUserData = async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  console.log(updateUser);
  res.status(200).render('account', {
    title: 'Your account',
    user: updateUser
  });
};
