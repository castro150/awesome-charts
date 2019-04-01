const express = require('express');
const moment = require('moment');
const router = express.Router();

const currencyApi = require('../apiClients/currency');
const GetRates = require('../../usecase/GetRates');

const ACCEPTED_CURRENCIES = __configs.acceptedCurrencies || ['USD', 'EUR', 'ARS'];

router.get('/', function (req, res, next) {
	if (!req.query.date) {
		res.status(400);
		return res.send('The "date" parameter is necessary.');
	} else if (!req.query.currency) {
		res.status(400);
		return res.send('The "currency" parameter is necessary.');
	}

	if (!moment(req.query.date, 'YYYY-MM-DD').isValid()) {
		res.status(400);
		return res.send('The "date" parameter is not correct formated, the right format is "YYYY-MM-DD".');
	}

	if (ACCEPTED_CURRENCIES.indexOf(req.query.currency) < 0) {
		res.status(400);
		return res.send(`This currency is not accepted. Accepted currencies: ${ACCEPTED_CURRENCIES}`);
	}

	const getRatesUC = new GetRates(currencyApi);

	return getRatesUC.execute(req.query.date, req.query.currency)
		.then(rates => res.json(rates))
		.catch(err => next(err));
});

module.exports = router;