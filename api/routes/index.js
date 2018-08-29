var express = require('express');
var router = express.Router();
const SubscriptionModel = require('../models/subscriptionModel');
const fs = require('fs');
const databaseConfig = require("../config.json").database.development;
const subscriptionModel = new SubscriptionModel(databaseConfig);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/subscription', (req, res, next) => {
  const data = {
    name: req.body.name,
    userId: req.body.userId,
    cost: req.body.cost,
    frequency: req.body.frequency,
    lastCharged: req.body.lastCharged
  }
  subscriptionModel.addSubscriptions(data, (err, result) => {
    if (err) return res.status(500).json({success: false, data: err.message});
    return res.json(result.rows);
  });
});

router.get('/subscriptions/:userId', (req, res, next) => {
  const userId = req.params.userId;
  subscriptionModel.getSubscriptions(userId, (err, result) => {
    if (err) return res.status(500).json({success: false, data: err.message});
    return res.json(result.rows);
  });
});

router.put('/subscriptions/:subId', (req, res, next) => {
  const subId = req.params.subId;
  const newData = {
    cost: req.body.cost,
    frequency: req.body.frequency,
    lastCharged: req.body.lastCharged
  }
  subscriptionModel.updateSubscription(subId, newData, (err, result) => {
    if (err) return res.status(500).json({success: false, data: err.message});
    return res.json(result.rows);
  })
});

router.delete('/subscriptions/:subId', (req, res, next) => {
  const subId = req.params.subId;
  subscriptionModel.deleteSubscription(subId, (err, result) => {
    if (err) return res.status(500).json({success: false, data: err.message});
    return res.json(result.rows);
  })
});

module.exports = router;
