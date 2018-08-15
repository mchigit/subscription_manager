var express = require('express');
var router = express.Router();
const SubscriptionModel = require('../models/subscriptionModel');
const fs = require('fs');

const databaseConfig = JSON.parse(fs.readFileSync('./api/config.json')).development;
const subscriptionModel = new SubscriptionModel(databaseConfig);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/subscription', (req, res, next) => {
  const data = {
    name: req.body.name,
    userId: req.body.userId,
    cost: req.body.cost,
    frequency: req.body.frequency,
    lastCharged: req.body.lastCharged
  }
  subscriptionModel.addSubscriptions(data, (err, result) => {
    if (err) return res.status(500).json({success: false, data: err});
    return res.json(result.rows);
  });
});

module.exports = router;
