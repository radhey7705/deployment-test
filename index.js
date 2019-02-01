// app.js
var dotenv = require('dotenv');

var express = require('express');
var bodyParser = require('body-parser');

var product = require('./routes/product'); // Imports routes for the products
var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
dotenv.config();


const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

//var mongoDB = `mongodb://${dbHost}:${dbPort}/${dbName}`;
var mongoDB = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/products', product);

var port = process.env.SERVER_PORT;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
