
// inital app load

import {takeEvery, call, put, select } from 'redux-saga/effects';

import {
   GET_INITIAL_CONVERSION,
   SWAP_CURRENCY,
   CHANGE_BASE_CURRENCY,
   CONVERSION_SUCCESS,
   CONVERSION_ERROR} from '../actions/currencies';

import {
  EMIT_CONVERSION_ERROR,
  RESET_CONVERSION_ERROR
} from '../actions/error';

//http://data.fixer.io/api/latest?access_key=9765ad6480fe3acce945987c6b80a65b&symbols=USD,AUD,CAD,PLN,MXN&format=1
//http://data.fixer.io/api/latest?access_key=9765ad6480fe3acce945987c6b80a65b&format=1
// const getLastestRate = currency => fetch(`http://data.fixer.io/api/latest?access_key=9765ad6480fe3acce945987c6b80a65b&base=${currency}`);

const getLastestRate = (currency) => fetch('http://data.fixer.io/api/latest?access_key=9765ad6480fe3acce945987c6b80a65b&format=1');
const handleJsonData = (jsonData, targetCurrency) => {
  let baseCurrency = jsonData.base;
  let originDict = jsonData.rates;
  let changeDict = {};
  let baseCurrencyRate = 1 / originDict[targetCurrency];
  changeDict[baseCurrency] = baseCurrencyRate;
  for (var key in originDict) {
    if (key != targetCurrency) {
      changeDict[key] = originDict[key] / originDict[targetCurrency];
    }
  }
  let resultConversions = {date:jsonData.date, isFetching:false, base:targetCurrency, rates:changeDict};
  let conversions = {};
  conversions[targetCurrency] = resultConversions;
  return { baseCurrency:targetCurrency, conversions:conversions};
}

function* fetchLastestConversionRates(action) {
  try {
    let currency = action.currency;
    if (currency === undefined) {
      state = yield select(state => state.currencies.baseCurrency);
      const response = yield call(getLastestRate, currency);
      const jsonData = yield response.json();
      console.log(response);
      console.log(jsonData);
      //断网依然可以GET
      if (jsonData.success == true) {
        yield put({ type:CONVERSION_SUCCESS , result:handleJsonData(jsonData, 'USD') });
      } else {
         if (jsonData.error) {
           console.log(jsonData.error);
           yield put({ type:CONVERSION_ERROR });
           yield put({ type:EMIT_CONVERSION_ERROR , error:jsonData.error});
         }
      }
    }
  } catch (e) {
    console.log('Saga error ', e);
    yield put({ type:CONVERSION_ERROR });
    yield put({ type:EMIT_CONVERSION_ERROR , error:{title:`Error: ${e.name}`, info:e.message}});
  }
  /*
  getLastestRate()
  .then( res => res.json())
  .then( jsonData => {
    console.log(jsonData);
    console.log(conversions);
  })
  .catch( err => console.log(err));*/
}

export default function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLastestConversionRates);
  // yield takeEvery(SWAP_CURRENCY, fetchLastestConversionRates);
  // yield takeEvery(CHANGE_BASE_CURRENCY, fetchLastestConversionRates);
}
