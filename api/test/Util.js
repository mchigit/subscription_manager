const fs = require('fs');
const databaseConfig = require('../config.json').database.test;
const {
    Pool
} = require('pg');
const async = require('async');

class Util {
    constructor() {
        this.pool = new Pool(databaseConfig);
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        });
    }

    /**
     * @todo Return promises for these functions since they are async
     */
    createEnum() {
        return new Promise(
            (resolve, reject) => {
                const queryEnum = `CREATE TYPE enum_subscriptions_frequency
                AS ENUM ('daily', 'weekly', 'monthly', 'annually');`

                this.pool.connect((err, client, done) => {
                    done();
                    if (err) reject({
                        success: false,
                        message: err.message
                    });
                    client.query(queryEnum)
                        .then(resolve({
                            success: true,
                            message: "Created Enum"
                        }))
                        .catch(err => reject({
                            success: false,
                            message: err.message
                        }))
                });
            }
        );
    }

    createTableUser() {
        return new Promise(
            (resolve, reject) => {
                const queryUser = `CREATE TABLE public.users
                (
                  id SERIAL,
                  email character varying(255) NOT NULL,
                  first_name character varying(255) NOT NULL,
                  last_name character varying(255) NOT NULL,
                  password character varying(255) NOT NULL,
                  created_at timestamp with time zone DEFAULT now(),
                  updated_at timestamp with time zone DEFAULT now(),
                  CONSTRAINT users_pkey PRIMARY KEY (id)
                )`;

                this.pool.connect((err, client, done) => {
                    done();
                    if (err) reject({
                        success: false,
                        message: err.message
                    });
                    client.query(queryUser)
                        .then(resolve({
                            success: true,
                            message: "Created User Table"
                        }))
                        .catch(err => reject({
                            success: false,
                            message: err.message
                        }))
                });
            }
        );
    }


    createTableSub() {
        return new Promise(
            (resolve, reject) => {
                const querySub = `CREATE TABLE subscriptions (
                    id SERIAL,
                    name character varying(255) NOT NULL,
                    user_id integer,
                    cost double precision NOT NULL,
                    frequency enum_subscriptions_frequency NOT NULL,
                    last_charged timestamp with time zone,
                    created_at timestamp with time zone DEFAULT now(),
                    updated_at timestamp with time zone DEFAULT now(),
                    CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
                    CONSTRAINT subscription_user_fkey FOREIGN KEY (user_id)
                        REFERENCES public.users (id) MATCH SIMPLE
                        ON UPDATE NO ACTION ON DELETE CASCADE
                )`;

                this.pool.connect((err, client, done) => {
                    done();
                    if (err) reject({
                        success: false,
                        message: err.message
                    });
                    client.query(querySub)
                        .then(resolve({
                            success: true,
                            message: "Created Subscription Table"
                        }))
                        .catch(err => reject({
                            success: false,
                            message: err.message
                        }))
                });
            }
        );
    }


    dropAllTables() {
        const queryDropTable = `
            DROP TABLE users CASCADE;
            DROP TABLE subscriptions CASCADE;
        `;

       
        return new Promise((resolve, reject) => {
            this.pool.connect((err, client, done) => {
                done();
                if (err) reject({
                    success: false,
                    message: err.message
                });
                client.query(queryDropTable)
                    .then(resolve({
                        success: true,
                        message: "Dropped Tables"
                    }))
                    .catch(err => reject({
                        success: false,
                        message: err.message
                    }))
            });
        });
    }
}

module.exports = Util;