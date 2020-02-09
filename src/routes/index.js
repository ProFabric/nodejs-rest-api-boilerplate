import express from 'express';
import publicRoutes from './public/auth.route';

const router = express.Router({ mergeParams: true });

router.use('/auth', publicRoutes);

export default router;
