const SubscriptionModel = require('../../models/SubscriptionModel');
const expect = require('chai').expect;
const Util = require('../Util');
const assert = require('assert');
const AuthModel = require('../../models/AuthModel');
const databaseConfig = require('../../config.json').database.test;

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
    const subscription1 = {};

    before(() => {
        util.createEnum()
            .then(util.createTableUser()
            .then(util.createTableSub()))
            .catch((err) => {
                throw new Error(err.message);
            });
    });

    after(() => {
        util.dropAllTables()
            .then()
            .catch((err) => {
                throw new Error(err.message);
            });                
    });

    it ('should test create subscriptions', () => {
        
    });
});