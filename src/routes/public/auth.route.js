import express from 'express';
import UserController from '../../controllers/user.controller';
import AuthController from '../../controllers/auth.controller';

const authLocal = require('../../services/auth.service');

const router = express.Router();

router.post('/signup', UserController.registerUser);

router.post('/signin', authLocal.default.authLocal, AuthController.login);

router.post('/forget-password', (req, res) => {
  res.status(200).json('forget-password');
});

module.exports = router;
