

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('datastore', 'postgres', 'admin',{
	host: 'localhost',
	dialect:'postgres'
})

module.exports={sequelize}
