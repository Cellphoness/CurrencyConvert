import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Button';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';

import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies'
import { connect } from 'react-redux';
import { connectAlert } from '../components/Alert';
import { connectMUB } from '../components/Loading';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRates: PropTypes.number,
    date: PropTypes.object,
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
    error: PropTypes.object,
    showMUB: PropTypes.func,
    hideMUB:  PropTypes.func,
    loading: PropTypes.bool,
  };

  componentWillMount() {
    this.props.dispatch(getInitialConversion());
  }

  handleChangeText = (text) => {
    this.props.dispatch(changeCurrencyAmount(text));
  };

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', selection:1});
  };

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', selection:2 });
  };

  handleSwapCurrency = () => {
    // console.log('handle swap currency');
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  };

  handleRefresh = () => {
    this.props.dispatch(getInitialConversion());
  };

  //可以用这个处理 不弹出重复的错误
  componentWillReceiveProps(nextProps) {
    if (nextProps.loading == true) {
      this.props.showMUB();
    } else {
      this.props.hideMUB();
    }
    let error = nextProps.error;
    if (error && error !== this.props.error) {
      if (error.code) {
        //'info' 'warn' 'error' 'success'
        this.props.alertWithType('error', `Code : ${error.code} Request Error api Fixer.io!`, error.info);
      } else {
        this.props.alertWithType('error', `Name : ${error.title}`, error.info);
      }
    }
  }

  render() {
    let quotePrice = ((this.props.amount * this.props.conversionRates).toFixed(2)).toString();
    let baseCurrency = this.props.baseCurrency;
    let quoteCurrency = this.props.quoteCurrency;
    let date = this.props.date;
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Header onPress1={this.handleOptionsPress} onPress2={this.handleRefresh} />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={this.props.primaryColor} />
          <InputWithButton
            buttonText={baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleChangeText}
            textColor={this.props.primaryColor}
          />
          <InputWithButton
            editable={false}
            buttonText={quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            value={quotePrice}
            textColor={this.props.primaryColor}
          />
          <LastConverted
            date={date}
            base={baseCurrency}
            quote={quoteCurrency}
            conversionRate={this.props.conversionRates}
          />
          <ClearButton onPress={this.handleSwapCurrency} text="Reverse Currencies" />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const amount = state.currencies.amount;
  const error = state.error.error;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  const date = conversionSelector.date || "";
  return {
    baseCurrency: baseCurrency,
    quoteCurrency: quoteCurrency,
    amount: amount,
    error: error,
    conversionRates: rates[quoteCurrency] || 0,
    date: new Date(Date.parse(date.replace(/-/g,"/"))),
    primaryColor: state.theme.primaryColor,
    loading: state.currencies.loading
  };
};

export default connect(mapStateToProps)(connectMUB(connectAlert(Home)));
