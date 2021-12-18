const router = require('express').Router();

//set routes for thoughts and users
const thoughtsRoutes = require('./thoughts-routes');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtsRoutes);

// add prefix of `/user` to routes created in `user-routes.js`
router.use('/user', userRoutes);

//export module router
module.exports = router;