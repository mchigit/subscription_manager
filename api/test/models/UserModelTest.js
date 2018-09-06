const expect = require('chai').expect;
const Util = require('../Util');
const assert = require('assert');
const AuthModel = require('../../models/AuthModel');
const databaseConfig = require('../../config.json').database.test;
const async = require("async");


describe('Auth model Basic CRUD', function () {
    const util = new Util();
    const authModel = new AuthModel(databaseConfig);

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

    it ('should register a new user', (done) => {
        
    })

});