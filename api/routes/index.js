var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');
const authController = new AuthController();
const SubscriptionController = require('../controllers/SubscriptionController');
const subController = new SubscriptionController();

router.post('/subscription', authController.checkForToken, subController.addSubscription);

router.get('/subscriptions/:userId', authController.checkForToken, subController.getSubscription);

router.put('/subscriptions/:subId', authController.checkForToken, subController.updateSubscription);

router.delete('/subscriptions/:subId', authController.checkForToken, subController.deleteSubscription);

module.exports = router;
