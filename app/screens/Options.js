import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, StatusBar, Platform, Linking } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
// https://oblador.github.io/react-native-vector-icons/
import { ListItem, Separator } from '../components/List';
import { connectAlert } from '../components/Alert';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
  };

  handlePressThemes = () => {
    this.props.navigation.navigate('Themes');
  };

  handlePressSite = () => {
    Linking.openURL('http://fixer.io').catch(() =>
      this.props.alertWithType('error', 'Sorry!', "Fixer.io can't be opened right now."),
    );
  };

  handlePressToDoList = () => {
    // Linking.openURL('http://localhost:3000/').catch(() =>
    //   this.props.alertWithType('error', 'Sorry!', "ToDoList can't be opened right now."),
    // );
    this.props.navigation.navigate('WebView');
  }
  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Themes"
          onPress={this.handlePressThemes}
          customIcon={
            <Ionicons name={`${ICON_PREFIX}-arrow-forward`} size={ICON_SIZE} color={ICON_COLOR} />
          }
        />
        <Separator />
        <ListItem
          text="Fixer.io"
          onPress={this.handlePressSite}
          customIcon={<Ionicons name={`${ICON_PREFIX}-link`} size={ICON_SIZE} color={ICON_COLOR} />}
        />
        <Separator />
          <ListItem
            text="ToDoList"
            onPress={this.handlePressToDoList}
            customIcon={<Ionicons name={`${ICON_PREFIX}-compass`} size={ICON_SIZE} color={ICON_COLOR} />}
          />
      </ScrollView>
    );
  }
}
export default connectAlert(Options);
