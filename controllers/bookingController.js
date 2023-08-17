const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('./../utils/catchAsync');
const factory = require('./../controllers/handlerFactory');

// catchAsync(async(ree,res,next)=>{

// })
exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // 2) Create Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    mode: 'payment',
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`]
          }
        }
      }
    ]
  });

  // 3) Create Session as response
  res.status(200).json({
    status: 'success',
    session
  });
});
exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour || !user || !price) return next();
  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
});
exports.checkIfBooked = catchAsync(async (req, res, next) => {
  const booking = await Booking.find({
    user: req.user.id,
    tour: req.body.tour
  });

  if (bookings.length === 0)
    return next(new AppError('You must buy this tour to review it', 401));

  next();
});
