const router = require('express').Router({ mergeParams: true });
const publicRoutes = require('./public/auth.route');

router.use('/auth', publicRoutes);

module.exports = router;
