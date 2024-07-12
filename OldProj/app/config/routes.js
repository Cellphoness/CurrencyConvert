import {StatusBar, View, Button} from 'react-native';
import React from 'react';
import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';
import CustomWebView from '../screens/WebView';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: 'tomato'},
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{
          title: 'Options',
        }}
      />
      <Stack.Screen
        name="Themes"
        component={Themes}
        options={{
          title: 'Themes',
        }}
      />
      <Stack.Screen
        name="WebView"
        component={CustomWebView}
        options={{
          title: 'WebView',
        }}
      />
    </Stack.Navigator>
  );
};

const CurrencyListStack = () => {
  return (
    <Stack.Navigator initialRouteName="CurrencyList">
      <Stack.Screen
        component={CurrencyList}
        name="CurrencyList"
        navigationOptions={({navigation}) => ({
          headerTitle: route.params.title,
          headerLeft: (
            <View style={{width: 80, alignItems: 'center'}}>
              <Button title="Back" onPress={() => navigation.goBack(null)} />
            </View>
          ),
        })}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      cardStyle={{paddingTop: StatusBar.currentHeight}}>
      <Stack.Screen name={'Home'} component={HomeStack}></Stack.Screen>
      <Stack.Screen
        name={'CurrencyList'}
        component={CurrencyList}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);
