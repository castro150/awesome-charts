class Rate {
	constructor(currency, compareBase, value, date) {
		this.currency = currency;
		this.compareBase = compareBase;
		this.value = value;
		this.date = date;
	}
}

module.exports = Rate;
