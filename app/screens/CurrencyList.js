import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StatusBar, View } from 'react-native';

import { ListItem, Separator } from '../components/List';
import currencies from '../data/currencies';

import {changeBaseCurrency, changeQuoteCurrency} from '../actions/currencies'
import {connect} from 'react-redux';

class CurrencyList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    primaryColor: PropTypes.string,
  };

  handlePress = (item, section, index) => {
    const {type} = this.props.navigation.state.params.selection;
    console.log('item :' + item + ' section:' + section + ' index :' + index);
    if (type == 1 ) {
      if (this.props.baseCurrency != item) {
        this.props.dispatch(changeBaseCurrency(item));
      }
    } else {
      if (this.props.quoteCurrency != item) {
        this.props.dispatch(changeQuoteCurrency(item));
      }
    }
    this.props.navigation.goBack(null);
  };

  render() {
    const {type} = this.props.navigation.state.params.selection;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="default" />
        <FlatList
          data={currencies.filter((item, i) => item != (type == 1 ? this.props.quoteCurrency : this.props.baseCurrency))}
          renderItem={({ item, section, index }) => (
            <ListItem
              text={item}
              selected={item == (type == 1 ? this.props.baseCurrency : this.props.quoteCurrency)}
              onPress={() => {
                this.handlePress(item, section, index);
              }}
              iconBackground={this.props.primaryColor}
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    baseCurrency: state.currencies.baseCurrency,
    quoteCurrency: state.currencies.quoteCurrency,
    primaryColor: state.theme.primaryColor,
  };
};

export default connect(mapStateToProps)(CurrencyList);
