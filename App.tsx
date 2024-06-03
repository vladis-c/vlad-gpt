import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import useSpeech from './src/hooks/useSpeech';

const App = () => {
  const {speech, startListening} = useSpeech();

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
