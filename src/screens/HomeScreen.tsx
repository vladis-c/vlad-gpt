import {Text, View, StyleSheet, Button} from 'react-native';
import {HomeScreenNavigationProps, MAIN_NAV} from '../navigation';
import useSpeech from '../hooks/useSpeech';

const HomeScreen = ({navigation}: HomeScreenNavigationProps) => {
  const {speech, startListening} = useSpeech({
    onOpenNamesScreen: () => navigation.navigate(MAIN_NAV.NAMES),
  });

  return (
    <View style={styles.container}>
      <Text>Press to talk!</Text>
      <Text>{speech.join(', ')}</Text>
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
