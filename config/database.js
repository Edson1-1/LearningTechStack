const {Sequelize} = require('sequelize') 
require('dotenv').config()
user = process.env.OWNER;
password = process.env.PASSWORD

//database connection
module.exports = new Sequelize(process.env.DB_NAME, process.env.OWNER , process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres' 
  });

