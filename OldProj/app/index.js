/*
 * @Author: Cellphoness
 * @Date: 2024-07-12 16:18:24
 * @LastEditors: Cellphoness
 * @LastEditTime: 2024-07-12 23:02:29
 * @FilePath: /OldProj/app/index.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux';

import Navigator from './config/routes';
import { AlertProvider } from './components/Alert';
import { ActivityProvider } from './components/Loading';
import store from './config/store';

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',

  $white: '#FFFFFF',
  $lightGray: '#F0F0F0',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $darkText: '#343434',
});

export default () =>
<Provider store={store}>
  <AlertProvider>
    <ActivityProvider>
      <Navigator />
    </ActivityProvider>
  </AlertProvider>
</Provider>;
