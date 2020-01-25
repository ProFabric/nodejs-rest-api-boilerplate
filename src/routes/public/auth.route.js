const router = require('express').Router();
const userController = require('./../../controllers/user.controller');

router.post('/signup', userController.registerUser);

router.post('/signin', (req, res) => {
  res.status(200).json('signin');
});

router.post('/forget-password', (req, res) => {
  res.status(200).json('forget-password');
});

module.exports = router;
