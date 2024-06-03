import {useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  ActivityIndicator,
  Button,
  LogBox,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useSpeech from './src/hooks/useSpeech';
import auth from './src/api/auth';

LogBox.ignoreLogs(['new NativeEventEmitter()']);

const App = () => {
  const {speech, startListening} = useSpeech();

  useEffect(() => {
    auth.login();
  }, []);

  if (!auth.authenticated) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={50} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{speech}</Text>
      <StatusBar style="auto" />
      <Button onPress={startListening} title="Text to speech" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
