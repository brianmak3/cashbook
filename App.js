

import React, { useRef } from 'react';
import Components from './src';
import { SafeAreaView, LogBox, View, StyleSheet, StatusBar } from 'react-native'
import colors from './src/Common/colors';
import { MenuProvider } from 'react-native-popup-menu';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './src/Redux';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-whc-toast'
import { Events } from './src/events';
LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  'componentWillReceiveProps',
  'DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.',
  'StatusBarIOS has been merged with StatusBar and will be removed in a future release.',
  'DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.'
])
const persistConfig = {
  key: 'authType',
  storage: AsyncStorage
},
  pReducer = persistReducer(persistConfig, reducer),
  middleware = applyMiddleware(thunk, logger),
  store = createStore(pReducer, middleware),
  persistor = persistStore(store),

  App: () => React$Node = () => {
    const toast = useRef();
    Events.addEventListener('toastMsg', data => {
      const { msg } = data;
      toast.current.show(msg)
    })
    return (
      <View style={styles.main}>
        <Provider store={store} >
          <PersistGate persistor={persistor} >
            <StatusBar barStyle={'light-content'} />
            <SafeAreaView />
            <MenuProvider>
              <Components />
            </MenuProvider>
          </PersistGate>
        </Provider>
        <Toast ref={toast} useNativeDriver={true} useNativeDriver={true} />
      </View >
    )
  }
const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.primary,
    flex: 1
  }
})
export default App;
