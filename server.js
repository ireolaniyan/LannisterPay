require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { initDb } = require('./config/database.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initDb();

const fee = require('./routes/fee.js');

app.use(express.json());
app.use('/api/v1', fee);

app.get('/', (req, res) => {
	res.json({ "message": "Welcome to Lannister Pay" });
})

const port = (process.env.NODE_ENV === 'test') ? process.env.NODE_PORT_TEST : process.env.NODE_PORT;
const server = app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
})

module.exports = server;