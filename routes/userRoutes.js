const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();
const bookingRouter = require('./bookingRoute');
router.post('/singUp', authController.singUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);
router.use('/:userId/bookings', bookingRouter);

router.patch('/updateMyPassword', authController.updatePassword);
router.route('/Me').get(userController.getMe, userController.getUser);

router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,

  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
