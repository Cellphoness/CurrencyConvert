import { CHANGE_CURRENCY_AMOUNT, SWAP_CURRENCY, CHANGE_QUOTE_CURRENCY, CHANGE_BASE_CURRENCY, CONVERSION_ERROR, CONVERSION_SUCCESS, GET_INITIAL_CONVERSION } from '../actions/currencies';

const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  amount: 100,
  error: null,
  conversions: {},
  loading: true,
  // conversions: {
  //   USD:{
  //     isFetching:false,
  //     base:'USD',
  //     date:'2017-05-31',
  //     rates:{
  //       AUD: 1.3416,
  //       BGN: 1.743,
  //       BRL: 3.2515,
  //       CAD: 1.3464,
  //       CHF: 0.97104,
  //       CNY: 6.813,
  //       CZK: 23.547,
  //       DKK: 6.6302,
  //       GBP: 0.77858,
  //       HKD: 7.7908,
  //       HRK: 6.6068,
  //       HUF: 273.77,
  //       IDR: 13308,
  //       ILS: 3.5431,
  //       INR: 64.463,
  //       JPY: 110.86,
  //       KRW: 1118.4,
  //       MXN: 18.765,
  //       MYR: 4.281,
  //       NOK: 8.4117,
  //       NZD: 1.4071,
  //       PHP: 49.77,
  //       PLN: 3.7173,
  //       RON: 4.0687,
  //       RUB: 56.774,
  //       SEK: 8.6942,
  //       SGD: 1.3829,
  //       THB: 34.07,
  //       TRY: 3.5366,
  //       ZAR: 13.133,
  //       EUR: 0.89119,}
  //   }
  // },
};

export default (state = initialState, action) => {
  switch (action.type) {

    case CHANGE_CURRENCY_AMOUNT:
      return { ...state, amount: action.amount ? parseInt(action.amount) : false || 0 };

    case CHANGE_BASE_CURRENCY:

      let baseCurrency = state.baseCurrency;
      let targetCurrency = action.currency;

      let originDict = state.conversions[baseCurrency]['rates'];
      console.log('rates:' + originDict);
      let changeDict = {};
      let baseCurrencyRate = 1 / originDict[targetCurrency];
      changeDict[baseCurrency] = baseCurrencyRate;
      for (var key in originDict) {
        if (key != baseCurrency) {
          changeDict[key] = originDict[key] / originDict[targetCurrency];
        }
      }
      let resultConversions = {...state.conversions[baseCurrency], base:targetCurrency, rates:changeDict};
      let conversions = {};
      conversions[targetCurrency] = resultConversions;
      return { ...state, baseCurrency:targetCurrency, conversions:conversions};

    case CHANGE_QUOTE_CURRENCY:
      return { ...state, quoteCurrency:action.currency};

    case SWAP_CURRENCY:
      var baseCurrency = state.baseCurrency;
      var targetCurrency = state.quoteCurrency;

      var originDict = state.conversions[baseCurrency]['rates'];
      console.log('rates:' + originDict);
      var changeDict = {};
      var baseCurrencyRate = 1 / originDict[targetCurrency];
      changeDict[baseCurrency] = baseCurrencyRate;
      for (var key in originDict) {
        if (key != baseCurrency) {
          changeDict[key] = originDict[key] / originDict[targetCurrency];
        }
      }
      var resultConversions = {...state.conversions[baseCurrency], base:targetCurrency, rates:changeDict};
      var conversions = {};
      conversions[targetCurrency] = resultConversions;
      return { ...state, baseCurrency:targetCurrency, quoteCurrency: baseCurrency, conversions:conversions};

    case CONVERSION_ERROR:
      return { ...state, loading:false};
      break;

    case CONVERSION_SUCCESS:
      return { ...state, ...action.result, loading:false};
      break;

    case GET_INITIAL_CONVERSION:
      return { ...state, loading:true};

    default:
      return state;
  }
};
