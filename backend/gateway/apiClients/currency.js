const axios = require('axios');
const moment = require('moment');
const currencyService = require('../services/currency');

const CURRENCY_API = __configs.currencyApi;
const BASE_CURRENCY = __configs.baseCurrency || 'BRL';

module.exports = {
	getCurrencies(date, currency) {
		let endAt = date;
		let startAt = moment(endAt, 'YYYY-MM-DD').subtract(1, 'week').format('YYYY-MM-DD');

		let url = `${CURRENCY_API.url}` +
			`?${CURRENCY_API.startDateParam}=${startAt}` +
			`&${CURRENCY_API.endDateParam}=${endAt}` +
			`&${CURRENCY_API.originCurrencyParam}=${BASE_CURRENCY}` +
			`&${CURRENCY_API.destinyCurrencyParam}=${currency}`;

		return axios.get(url)
			.then(response => {
				let rates = currencyService.addWeekends(response.data.rates);
				response.data.rates = rates;

				return response.data;
			});
	}
};
