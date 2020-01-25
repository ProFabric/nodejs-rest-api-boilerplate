const router = require('express').Router();

router.post('/signup', (req, res) => {
  res.status(200).json('Signup');
});

router.post('/signin', (req, res) => {
  res.status(200).json('signin');
});

router.post('/forget-password', (req, res) => {
  res.status(200).json('forget-password');
});

module.exports = router;
