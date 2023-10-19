const router = require('express').Router();
const thoughtRoutes = require("./thoughtRoute");
const userRoutes = require("./userRoute");

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;