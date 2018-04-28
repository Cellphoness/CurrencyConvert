import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import ActivityMUB from './ActivityMUB';

class ActivityProvider extends Component {
  static childContextTypes = {
    showMUB: PropTypes.func,
    hideMUB: PropTypes.func,
  };

  static propTypes = {
    children: PropTypes.any,
  };

  getChildContext() {
    return {
      showMUB: () => { if (this.mub) {this.mub.show();} },
      hideMUB: () => { if (this.mub) {this.mub.hide();} }
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
        <ActivityMUB
          alpha={0.5}
          layerColor={'#000000'}
          ref={(ref) => {
            this.mub = ref;
          }}
        />
      </View>
    );
  }
}

export default ActivityProvider;
