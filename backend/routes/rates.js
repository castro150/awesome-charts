let express = require('express');
let axios = require('axios');
let router = express.Router();
let debug = require('debug')('acharts:server:routes:rates');

router.get('/', function (req, res, next) {
    debug('I am in rates');
    // BRL, USD, EUR, ARS
    // https://api.exchangeratesapi.io/history?start_at=2019-03-01&end_at=2019-03-08&base=USD&symbols=BRL
    // https://openexchangerates.org/api/currencies.json
    axios.get('http://apilayer.net/api/live?access_key=487d9be3ed103e9de14e72b88d78f13c&date=2019-03-0&source=EUR&currencies=USD')
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
        })
        .catch(err => next(err));
});

module.exports = router;
