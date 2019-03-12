let express = require('express');
let router = express.Router();

let ratesRouter = require('./rates');

module.exports = function (app) {
	// GET home page.
	router.get('/', function(req, res) {
		res.send('Awesome Charts Server is running!');
	});

    app.use('/api', router);
    app.use('/api/v1/rates', ratesRouter);
};
