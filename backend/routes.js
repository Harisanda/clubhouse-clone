const router = require('express').Router();
const authController = require('./controllers/auth-controllers');
const activateController = require('./controllers/activate-controllers')
const authMiddleware = require('./middlewares/auth-middleware');


router.post('/api/send-otp',authController.sendOtp);
router.post('/api/verify-otp',authController.verifyOtp);
router.post('/api/test',(req,res) => {
    res.json({message: 'hello'});
})
router.post('/api/activate',authMiddleware , activateController.activate);

module.exports = router;