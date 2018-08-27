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

    /**
     * @todo finish before function to create all database schema synchronously
     *
     */
    before(() => {
        util.createTables((err, result) => {
            if (err) {
                throw new Error("Could not create database schema for testing");
            } else {
                if (result.success) {
                    console.log(result.message);
                }
                authModel.registerUser(user1, (err, res) => {
                    if (err) {
                        throw new Error("Could not register a new user");
                    }
                });
            }
            
        });
    });

    // after(() => {
    //     util.dropAllTables((err) => {
    //         if (err) {
    //             throw new Error("Could not drop testing schema");
    //         }
    //     });
    // });

    it ('should test create subscriptions', () => {
        
    });
});