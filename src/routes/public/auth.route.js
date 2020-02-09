import express from 'express';
import UserController from '../../controllers/user.controller';
import AuthController from '../../controllers/auth.controller';
import AuthLocal from '../../services/auth.service';

const router = express.Router();

router.post('/signup', UserController.registerUser);

router.post('/signin', AuthLocal.authLocal, AuthController.login);

router.post('/forget-password', (req, res) => {
  res.status(200).json('forget-password');
});

export default router;
