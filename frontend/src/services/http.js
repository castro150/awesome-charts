import axios from 'axios';
import moment from 'moment';

export default {
  async getRateData(currency, date) {
    const fomartedDate = moment(date).format('YYYY-MM-DD');
    const result = await axios.get(`http://${__configs.achartsServer}/api/v1/rates?date=${fomartedDate}&currency=${currency}`);

    return result.data;
  },
};
