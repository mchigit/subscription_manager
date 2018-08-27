const fs = require('fs');
const databaseConfig = require('../config.json').database.test;
const { Pool } = require('pg');
const async = require('async');

class Util {
    constructor(){
        this.pool = new Pool(databaseConfig);
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        });
    }

    /**
     * @todo Return promises for these functions since they are async
     */
    createEnum = () => {
        const queryEnum = `CREATE TYPE enum_subscriptions_frequency
         AS ENUM ('daily', 'weekly', 'monthly', 'annually');`


    }

    createTables(callback) {


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
        const createEnum = (client, callback) => {
            client.query(queryEnum)
                .then(callback())
                .catch(e => callback(e))
        }
        
        const createUser = (client, callback) => {
            client.query(queryUser)
                .then(callback())
                .catch(e => callback(e))
        }

        const createSub = (client, callback) => {
            client.query(querySub)
                .then(callback())
                .catch(e => callback(e))
        }

        this.pool.connect((err, client, done) => {
            if (err) return callback(err);
            const tasks = [
                createEnum(client, callback),
                createUser(client, callback),
                createSub(client, callback)
            ]
            async.series(tasks, (err, result) => {
                if (err) throw new Error('Could not create schema', err);
                callback(null, {success: true, message: "Successfully Created Schema"});
            });
        });
    }

    dropAllTables(callback) {
        const queryDropTable = `
            DROP TABLE users;
            DROP TABLE subscriptions;
        `;
        this.pool.connect((err, client, done) => {
            if (err) return callback(err);
            client.query(queryDropTable)
                .then(callback())
                .catch(e => callback(e))
        });
    }
}

module.exports = Util;