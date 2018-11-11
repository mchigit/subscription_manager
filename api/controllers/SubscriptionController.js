const SubscriptionModel = require('../models/subscriptionModel');
const databaseConfig = require("../config.json").database[process.env.NODE_ENV || "development"];
const subscriptionModel = new SubscriptionModel(databaseConfig);

class SubscriptionController {

    addSubscription(req, res, next) {
        const data = {
            name: req.body.name,
            userId: req.body.userId,
            cost: req.body.cost,
            frequency: req.body.frequency,
            lastCharged: req.body.lastCharged
        }
        subscriptionModel.addSubscriptions(data, (err, result) => {
            if (err) return res.status(500).json({ success: false, data: err.message });
            return res.json(result.rows);
        });
    }

    getSubscription(req, res, next) {
        const userId = req.params.userId;
        subscriptionModel.getSubscriptions(userId, (err, result) => {
            if (err) return res.status(500).json({ success: false, data: err.message });
            return res.json(result.rows);
        });
    }

    updateSubscription(req, res, next) {
        const subId = req.params.subId;
        const newData = {
            cost: req.body.cost,
            frequency: req.body.frequency,
            lastCharged: req.body.lastCharged
        }
        subscriptionModel.updateSubscription(subId, newData, (err, result) => {
            if (err) return res.status(500).json({ success: false, data: err.message });
            return res.json(result.rows);
        });
    }

    deleteSubscription(req, res, next) {
        const subId = req.params.subId;
        subscriptionModel.deleteSubscription(subId, (err, result) => {
            if (err) return res.status(500).json({ success: false, data: err.message });
            return res.json(result.rows);
        })
    }
}

module.exports = SubscriptionController;