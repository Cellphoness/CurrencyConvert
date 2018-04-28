/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const connectMUB = (WrappedComponent) => {
  class ConnectedMUB extends Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          showMUB={this.context.showMUB}
          hideMUB={this.context.hideMUB}
        />
      );
    }
  }

  ConnectedMUB.contextTypes = {
    showMUB: PropTypes.func,
    hideMUB: PropTypes.func,
  };

  return hoistNonReactStatic(ConnectedMUB, WrappedComponent);
};

export default connectMUB;
