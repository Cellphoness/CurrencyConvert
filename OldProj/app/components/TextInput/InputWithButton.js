/*
 * @Author: Cellphoness
 * @Date: 2024-07-12 16:18:24
 * @LastEditors: Cellphoness
 * @LastEditTime: 2024-07-12 23:47:28
 * @FilePath: /OldProj/app/components/TextInput/InputWithButton.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import PropTypes from 'prop-types';
import React from 'react';
import { View, TextInput, TouchableHighlight, Text } from 'react-native';
import color from 'color';

import styles from './styles';

const InputWithButton = (props) => {
  const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
    styles.$buttonBackgroundColorModifier,
  );

  const containerStyles = [styles.container];
  if (props.editable === false) {
    containerStyles.push(styles.containerDisabled);
  }
  const buttonTextStyles = [styles.buttonText];
  if (props.textColor) {
    buttonTextStyles.push({color: props.textColor});
  }
  return (
    <View style={containerStyles}>
      <TouchableHighlight
        onPress={props.onPress}
        style={styles.buttonContainer}
        underlayColor={underlayColor}
      >
        <Text style={buttonTextStyles}>{props.buttonText}</Text>
      </TouchableHighlight>
      <View style={styles.separator} />
      <TextInput style={styles.input} underlineColorAndroid="transparent" {...props} onPress={null} />
    </View>
  );
};

InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool,
  textColor: PropTypes.string,
};

export default InputWithButton;
