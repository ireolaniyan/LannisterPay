require('dotenv').config();
const mongoose = require('mongoose');

const models = require('../app/models');

const db_url = (process.env.NODE_ENV === 'test') ? 'mongodb://127.0.0.1:27017/lannister-pay-test' : 'mongodb://127.0.0.1:27017/lannister-pay';

mongoose.Promise = global.Promise;
let dbConnection;
let db = {};

function initDb() {
	mongoose.connect(db_url, {}).then((db) => {
		dbConnection = db;
		console.log("Successfully connected to the database 😃");
	}).catch(err => {
		console.log('Could not connect to the database. Exiting now...', err);
		process.exit();
	})
}

function getDb() {
	return dbConnection;
}

db.fee = models.FeeModel;

module.exports = { initDb, getDb, db };