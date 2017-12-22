/** Imports */
var compression = require('compression'),
    bodyParser = require('body-parser'),
    express = require('express'),
    helmet = require('helmet'),
    mongoose = require('mongoose'),
    Objects = require('./api/models/objects');

var config = require('./env.json')[process.env.NODE_ENV || 'development'];
var routes = require('./api/routes/routes');
var app = express();
var port = 80;

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI, { useMongoClient: true });

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the route

app.listen(port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('Listening on: ', port);