require('dotenv').config();
const mongoose = require('mongoose');

const models = require('../app/models');

const db_url = process.env.DB_URL;

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