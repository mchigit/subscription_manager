const expect = require('chai').expect;
const Util = require('../Util');
const assert = require('assert');
const AuthModel = require('../../models/AuthModel');
const databaseConfig = require('../../config.json').database.test;
// requiring subscription model test is used to specify test order
const firstTest = require('./SubscriptionModelTest');
const async = require("async");


describe('Auth model Basic CRUD', function () {
    const util = new Util();
    const authModel = new AuthModel(databaseConfig);
    const testUser = {
        email: "test@test.com",
        firstName: "test",
        lastName: "test",
        hashedPassword: "password"
    }

    before(() => {
        return new Promise((resolve) => {
            util.createEnum()
            .then(util.createTableUser())
            .then(util.createTableSub())
            .then(resolve)
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

    it ('should register a new user', (done) => {
        authModel.registerUser(testUser, (err, result) => {
            if (err) {
                assert(false);
            } else {
                expect(result.rows.length).to.equal(1);
            }
            done();
        });
    })

});