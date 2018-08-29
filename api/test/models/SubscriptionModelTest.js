const SubscriptionModel = require('../../models/SubscriptionModel');
const expect = require('chai').expect;
const Util = require('../Util');
const assert = require('assert');
const AuthModel = require('../../models/AuthModel');
const databaseConfig = require('../../config.json').database.test;
const async = require("async");

describe('SubscriptionModel Basic CRUD', function () {
    const util = new Util();
    const subscriptionModel = new SubscriptionModel(databaseConfig);
    const authModel = new AuthModel(databaseConfig)
    const user1 = {
        email: "test@gmail.com",
        firstName: "User1",
        lastName: "Test",
        hashedPassword: "password"
    };
    var subscription1 = {
        name: "testSub",
        cost: 10,
        frequency: "monthly",
        userId: 1,
        lastCharged: null
    };

    before(() => {
        return new Promise((resolve) => {
            util.createEnum()
            .then(util.createTableUser())
            .then(util.createTableSub())
            .then(() => {
                authModel.registerUser(user1, (err, result) => {
                    if (err) {
                        throw new Error(err.message);
                    } else {
                        resolve();
                    }
                });
            })
            .catch((err) => {
                throw new Error(err.message);
            });
        });
    });

    after(() => {
        util.dropAllTables()
            .then()
            .catch((err) => {
                throw new Error(err.message);
            });                
    });

    it ('should create subscriptions', (done) => {
        subscriptionModel.addSubscriptions(subscription1, (err, result) => {
            if (err) {
                assert(false);
            } else {
                const insertSub = result.rows[0];
                expect(insertSub.name).to.equal("testSub");
                expect(insertSub.cost).to.equal(10);
                expect(insertSub.frequency).to.equal("monthly");
            }
            done();
        });
    });

    it ('should update subscriptions', (done) => {
        const newSub = {...subscription1, cost: 15, frequency: "daily"};
        async.waterfall([
            (callback) => {
                subscriptionModel.getSubscriptions(subscription1.userId, (err, result) => {
                    callback(err, result.rows[0].id);
                });
            }, (subId, callback) => {
                subscriptionModel.updateSubscription(subId, newSub, (err, result) => {
                    callback(err, result.rows[0]);
                })
            }
        ], (err, result) => {
            if (err) {
                assert(false);
            } else {
                const updatedSub = result;
                expect(updatedSub.name).to.equal(subscription1.name);
                expect(updatedSub.cost).to.equal(15);
                expect(updatedSub.frequency).to.equal("daily");
            }
            done();
        });

    });
});