import { StatusBar, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import React from 'react';
import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';
import CustomWebView from '../screens/WebView';

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null,
        headerTitle: 'Home',
      },
    },
    Options: {
      screen: Options,
      navigationOptions: {
        headerTitle: 'Options',
      },
    },
    Themes: {
      screen: Themes,
      navigationOptions: {
        headerTitle: 'Themes',
      },
    },
    WebView: {
      screen: CustomWebView,
      navigationOptions: {
        headerTitle: 'WebView',
      },
    },
  },
  {
    headerMode: 'screen',
  },
);

const CurrencyListStack = StackNavigator({
  CurrencyList: {
    screen: CurrencyList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.title,
      headerLeft:(
           	<View style={{width:80, alignItems: 'center'}}>
                  <Button
                     title="Back"
                     onPress={() => navigation.goBack(null)}
                  />
           	</View>
          ),
    }),
  },
});

export default StackNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    CurrencyList: {
      screen: CurrencyListStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
);
