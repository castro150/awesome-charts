const Rate = require('../model/Rate');

const BASE_CURRENCY = __configs.baseCurrency || 'BRL';

class GetRates {
	constructor(currencyAdapter) {
		this.currencyAdapter = currencyAdapter;
	}

	execute(date, currency) {
		return this.currencyAdapter.getCurrencies(date, currency)
			.then(data => {
				let rates = [];

				let days = Object.keys(data.rates);
				days.forEach(day => {
					rates.push(new Rate(currency, BASE_CURRENCY, data.rates[day][BASE_CURRENCY], day));
				});

				return rates;
			});
	}
}

module.exports = GetRates;
