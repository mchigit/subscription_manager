# Subscription Manager

## Development Environment

The project is written using React/Node, with PostgreSQL as database. The project also uses [Sequelize](http://docs.sequelizejs.com/) to manage data

Need to install: 
- Node (https://nodejs.org/en/download/)
- PostgreSQL 9.6 (https://www.postgresql.org/download/)
- Sequelize CLI (```npm install -g sequelize-cli```)

## Getting Started
Clone this repository and navigate to the project root

```bash
git clone git@github.com:michaelchi1997/subscription_manager.git
cd subscription_manager
```

Because the project is divided into API and Client, both needs dependency installed by NPM. 

You can go to each directory and run `npm install` or go to the root directory and run `npm run install-all`

## Setting up database

Manually Create 2 databases in PostgreSQL Server: 
- `sub_manager_dev`
- `sub_manager_test`

The project uses `SequelizeJs`, which will automatically create the database schema through migration. Modify `api/server/config.json` to set up connection to local PostgreSQL database. 

After installing Sequelize CLI globally, run the following code under the `api` folder:

```bash
sequelize db:migrate
```

## Run server:

Under root directory:

```bash
npm run start-dev
```

or go to `api` and `client` and run `npm start` seperately

