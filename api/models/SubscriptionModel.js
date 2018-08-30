const fs = require('fs');
const { Pool } = require('pg');
const moment = require('moment');

function getTimestampNow() {
    return moment().format();
}

class SubscriptionModel {
    constructor(connectionConfig) {
        this.pool = new Pool(connectionConfig);
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        });
    }

    addSubscriptions(data, callback) {
        const query = `INSERT into Subscriptions(name, user_id, cost, frequency, last_charged, created_at, updated_at)
                        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, user_id, cost, frequency, last_charged`;
        this.pool.connect((err, client, done) => {
            if (err) return callback(err);

            client.query(query, [data.name, data.userId, data.cost, data.frequency, data.lastCharged, getTimestampNow(), getTimestampNow()], (err, result) => {
                done();

                if (err) {
                    return callback(err);
                } else {
                    return callback(null, result);
                }
            });
        });
    }

    getSubscriptions(userId, callback) {
        const query = `SELECT * FROM subscriptions WHERE user_id = $1`;
        this.pool.connect((err, client, done) => {
            if (err) return callback(err)
            client.query(query, [userId], (err, result) => {
                done();

                if (err) {
                    return callback(err);
                } else {
                    return callback(null, result);
                }
            });
        });
    }

    updateSubscription(subId, newData, callback) {
        const query = `UPDATE subscriptions SET cost = $1, frequency = $2, last_charged = $3, updated_at = $4 WHERE id = $5
                         RETURNING id, name, user_id, cost, frequency, last_charged;`;
        this.pool.connect((err, client, done) => {
            if (err) return callback(err);
            client.query(query, [newData.cost, newData.frequency, newData.lastCharged, getTimestampNow(), subId], (err, result) => {
                done();

                if (err) {
                    return callback(err);
                } else {
                    return callback(null, result);
                }
            });
        });
    }

    deleteSubscription(subId, callback) {
        const query = `DELETE FROM subscriptions WHERE id = $1 RETURNING id;`;
        this.pool.connect((err, client, done) => {
            if (err) return callback(err);
            client.query(query, [subId], (err, result) => {
                done();

                if (err) {
                    return callback(err);
                } else {
                    return callback(null, result);
                }
            });
        });
    }
}

module.exports = SubscriptionModel;