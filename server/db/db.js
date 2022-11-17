const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

config.dialectOptions = {
  ssl: {
    rejectUnauthorized: false
  }
};

const db = new Sequelize(
  "postgres://graceshopper_db_user:1DkgA932cTyvEu3FIVrysmoVelGarwTp@dpg-cdqgclla4994et8r5n1g-a.ohio-postgres.render.com/graceshopper_db", config)
module.exports = db
