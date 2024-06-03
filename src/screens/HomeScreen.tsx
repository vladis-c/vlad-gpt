import {Text, View, StyleSheet, Button} from 'react-native';
import {HomeScreenNavigationProps} from '../navigation';
import useSpeech from '../hooks/useSpeech';

const HomeScreen = ({navigation}: HomeScreenNavigationProps) => {
  const {speech, startListening} = useSpeech();

  return (
    <View style={styles.container}>
      <Text>Press to talk!</Text>
      <Text>{speech}</Text>
      <Button onPress={startListening} title="Text to speech" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
