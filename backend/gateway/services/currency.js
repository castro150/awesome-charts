const moment = require('moment');

module.exports = {
	addWeekends(rates) {
		const days = Object.keys(rates).sort();
		days.some(day => {
			let momentDay = moment(day, 'YYYY-MM-DD');
			if (momentDay.isoWeekday() === 5) {
				const saturday = momentDay.add(1, 'day').format('YYYY-MM-DD');
				const sunday = momentDay.add(1, 'day').format('YYYY-MM-DD');
				rates[saturday] = rates[day];
				rates[sunday] = rates[day];
				return true;
			}

			return false;
		});

		const newDays = Object.keys(rates).sort();
		if (newDays.length > 7) delete rates[newDays[0]];

		return rates;
	}
};