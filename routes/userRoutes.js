const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/singUp', authController.singUp);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
//  use patch because change in user document
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);
router.route('/').get(userController.getAllUsers);
module.exports = router;
