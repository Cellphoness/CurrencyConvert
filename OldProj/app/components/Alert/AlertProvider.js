/*
 * @Author: Cellphoness
 * @Date: 2024-07-12 16:18:24
 * @LastEditors: Cellphoness
 * @LastEditTime: 2024-07-12 23:37:44
 * @FilePath: /OldProj/app/components/Alert/AlertProvider.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

class AlertProvider extends Component {
  static childContextTypes = {
    alertWithType: PropTypes.func,
    alert: PropTypes.func,
  };

  static propTypes = {
    children: PropTypes.any,
  };

  getChildContext() {
    return {
      alert: (...args) => this.dropdown.alert && this.dropdown.alert(...args),
      alertWithType: (...args) => this.dropdown && this.dropdown.alertWithType && this.dropdown.alertWithType(...args),//'info' 'warn' 'error' 'success'
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
        <DropdownAlert
          ref={(ref) => {
            this.dropdown = ref;
          }}
        />
      </View>
    );
  }
}

export default AlertProvider;
