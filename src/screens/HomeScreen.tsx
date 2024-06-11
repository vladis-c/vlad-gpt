import {Text, View, StyleSheet, Button} from 'react-native';
import {HomeScreenNavigationProps, MAIN_NAV} from '../navigation';
import useSpeech from '../hooks/useSpeech';
import db from '../api/db';

const HomeScreen = ({navigation}: HomeScreenNavigationProps) => {
  const {speech, startListening} = useSpeech();

  return (
    <View style={styles.container}>
      <Text>Press to talk!</Text>
      <Text>{speech}</Text>
      <Button onPress={startListening} title="Text to speech" />
      <View style={{height: 50}} />
      {speech ? (
        <>
          <Button
            onPress={() => db.setDoc(speech, 0)}
            title={`Add "${speech}" to the list`}
          />
          <View style={{height: 50}} />
        </>
      ) : null}
      <Button
        onPress={() => navigation.navigate(MAIN_NAV.NAMES)}
        title="See the list of the names"
      />
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
