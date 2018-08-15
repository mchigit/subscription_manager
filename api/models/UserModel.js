const fs = require('fs');
const { Pool } = require('pg');
const moment = require('moment');

function getTimestampNow() {
    return moment().format();
}

class UserModel {
    constructor(connectionConfig) {
        this.pool = new Pool(connectionConfig);
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
    }

    addUser(data, callback) {
        const query = `INSERT into users(email, first_name, last_name, frequency, last_charged, "createdAt", "updatedAt")
                        VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        this.pool.connect((err, client, done) => {
            if (err) return callback(err.message);
            client.query(query, [data.name, data.userId, data.cost, data.frequency, data.lastCharged, getTimestampNow(), getTimestampNow()], (err, result) => {
                done();

                if (err) {
                    return callback(err.message);
                } else {
                    return callback(null, result);
                }
            });
        });
    }

    getSubscriptions(userId) {
        pool.connect((err, client, done) => {

        });
    }

}

module.exports = UserModel;