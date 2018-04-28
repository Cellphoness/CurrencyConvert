import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

const Header = ({ onPress1, onPress2 }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress2} style={styles.button2}>
      <Image resizeMode="contain" source={require('./images/icon.png')} style={styles.icon2} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress1} style={styles.button1}>
      <Image resizeMode="contain" source={require('./images/gear.png')} style={styles.icon1} />
    </TouchableOpacity>
  </View>
);

Header.propTypes = {
  onPress: PropTypes.func,
};

export default Header;
