const { Pool } = require('pg');
const moment = require('moment');

class AuthModel {
    constructor(connectionConfig) {
        this.pool = new Pool(connectionConfig);
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
    }

    registerUser(data, callback) {
        const query = `INSERT INTO Users(email, first_name, last_name, password) 
                        VALUES ($1, $2, $3, $4) RETURNING id;`;
        this.pool.connect((err, client, done) => {
            if (err) return callback(err);
            client.query(query, [data.email, data.firstName, data.lastName, data.hashedPassword], (err, result) => {
                done();
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, result);
                }
            });
        });
    }

    getUser(email, callback) {
        const query = `SELECT * from Users WHERE email = $1`;
        this.pool.connect((err, client, done) => {
            if (err) return callback(err);
            client.query(query, [email], (err, result) => {
                done();
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, result);
                }
            });
        })
    }
}

module.exports = AuthModel;