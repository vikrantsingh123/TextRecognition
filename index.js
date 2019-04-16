/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'mobx-react';
import App from './src/App';
import store from './src/mst/stores';
import { name as appName } from './app.json';

const MyApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => MyApp);
