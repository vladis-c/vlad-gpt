import {StatusBar} from 'expo-status-bar';
import {LogBox, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import auth from './src/api/auth';
import MainNav from './src/navigation/MainNav';
import {useEffect} from 'react';
import usePrefetch from './src/hooks/usePrefetch';
import NamesContextProvider from './src/context/NamesContext';

LogBox.ignoreLogs(['new NativeEventEmitter()']);

SplashScreen.preventAutoHideAsync();

const App = () => {
  usePrefetch();

  useEffect(() => {
    (async () => {
      if (auth.authenticated) {
        await SplashScreen.hideAsync();
      }
    })();
  }, [auth.authenticated]);

  return (
    <SafeAreaProvider style={styles.container}>
      <NamesContextProvider>
        <NavigationContainer>
          <StatusBar translucent={true} />
          <MainNav />
        </NavigationContainer>
      </NamesContextProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
