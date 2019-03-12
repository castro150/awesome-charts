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

    console.log(BASE_CURRENCY);
    console.log(ACCEPTED_CURRENCIES);
    console.log(CURRENCY_API);

    // BRL, USD, EUR, ARS
    // https://api.exchangeratesapi.io/history?start_at=2019-03-01&end_at=2019-03-08&base=USD&symbols=BRL
    // https://openexchangerates.org/api/currencies.json
    axios.get('https://api.exchangeratesapi.io/history?start_at=2019-03-01&end_at=2019-03-08&base=USD&symbols=BRL')
        .then(response => res.json(response.data))
        .catch(err => next(err));
});

module.exports = router;
