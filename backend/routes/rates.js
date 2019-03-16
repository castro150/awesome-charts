const express = require('express');
const moment = require('moment');
const axios = require('axios');
const router = express.Router();

const CURRENCY_API = __configs.currencyApi;
const BASE_CURRENCY = __configs.baseCurrency || 'BRL';
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

	let endAt = req.query.date;
	let startAt = moment(endAt, 'YYYY-MM-DD').subtract(1, 'week').format('YYYY-MM-DD');

	let url = `${CURRENCY_API.url}` +
		`?${CURRENCY_API.startDateParam}=${startAt}` +
		`&${CURRENCY_API.endDateParam}=${endAt}` +
		`&${CURRENCY_API.originCurrencyParam}=${BASE_CURRENCY}` +
		`&${CURRENCY_API.destinyCurrencyParam}=${req.query.currency}`;

	return axios.get(url)
		.then(response => {
			const days = Object.keys(response.data.rates).sort();
			days.some(day => {
				let momentDay = moment(day, 'YYYY-MM-DD');
				if (momentDay.isoWeekday() === 5) {
					const saturday = momentDay.add(1, 'day').format('YYYY-MM-DD');
					const sunday = momentDay.add(1, 'day').format('YYYY-MM-DD');
					response.data.rates[saturday] = response.data.rates[day];
					response.data.rates[sunday] = response.data.rates[day];
					return true;
				}

				return false;
			});

			const newDays = Object.keys(response.data.rates).sort();
			if (newDays.length > 7) delete response.data.rates[newDays[0]];
			return res.json(response.data);
		})
		.catch(err => next(err));
});

module.exports = router;