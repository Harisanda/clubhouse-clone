const router = require('express').Router();
const authController = require('./controllers/auth-controllers');
const activateController = require('./controllers/activate-controllers')
const authMiddleware = require('./middlewares/auth-middleware');
const roomsControllers = require('./controllers/rooms-controllers');
const requestControllers = require('./controllers/request-controllers');


router.post('/api/send-otp',authController.sendOtp);
router.post('/api/verify-otp',authController.verifyOtp);
router.post('/api/activate',authMiddleware , activateController.activate);
router.get('/api/refresh', authController.refresh);
router.post('/api/logout',authMiddleware , authController.logout);
router.post('/api/rooms',authMiddleware , roomsControllers.create);
router.get('/api/rooms',authMiddleware , roomsControllers.index);
router.get('/api/rooms/:roomId', authMiddleware,roomsControllers.show);
router.patch('/api/rooms/:roomId', authMiddleware, roomsControllers.add);
router.post('/api/request', authMiddleware, requestControllers.sendRequest);
router.get('/api/request', authMiddleware, requestControllers.getRequest);
router.patch('/api/request/:requestId', authMiddleware, requestControllers.acceptOrdeclineRequest);
router.patch('/api/speaker/:roomId', authMiddleware, roomsControllers.addOnStage);

module.exports = router;