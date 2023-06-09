const router = require('express').Router();
const authController = require('./controllers/auth-controllers');
const activateController = require('./controllers/activate-controllers')
const authMiddleware = require('./middlewares/auth-middleware');


router.post('/api/send-otp',authController.sendOtp);
router.post('/api/verify-otp',authController.verifyOtp);
router.post('/api/activate',authMiddleware , activateController.activate);
router.get('/api/refresh', authController.refresh);
router.post('/api/logout', authController.logout);


module.exports = router;