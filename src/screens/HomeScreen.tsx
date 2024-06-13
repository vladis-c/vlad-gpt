import {Text, View, StyleSheet, Button} from 'react-native';
import {HomeScreenNavigationProps} from '../navigation';
import useSpeech from '../hooks/useSpeech';
import useSetDoc from '../hooks/useSetDoc';
import useCommunicate from '../hooks/useCommunicate';
import {useContext} from 'react';
import {MessagesContext} from '../context/MessagesContext';
import {NamesContext} from '../context/NamesContext';

const HomeScreen = ({navigation}: HomeScreenNavigationProps) => {
  const {speech, startListening} = useSpeech();
  const {messages} = useContext(MessagesContext);
  const {names} = useContext(NamesContext);
  const {setDoc} = useSetDoc();
  const {communicate} = useCommunicate();

  return (
    <View style={styles.container}>     
      <View style={{height: 20}} />
      <Text>Press to talk!</Text>
      <Text>{speech.join(', ')}</Text>
      <Button onPress={startListening} title="Text to speech" />
      <View style={{height: 50}} />
      <Button
        onPress={() => setDoc('Vlad')}
        title={`Add "${speech[0]}" to the list`}
      />
      <View style={{height: 50}} />
      {/* <Button
        onPress={() => navigation.navigate(MAIN_NAV.NAMES)}
        title="See the list of the names"
      />
      <View style={{height: 50}} /> */}
      {messages.length > 0 ? (
        <Text>
          {messages
            .map(m => m.contents.parts.map(p => p.text).join(' '))
            .join('; \n')}
        </Text>
      ) : null}
      <Button
        onPress={() => communicate('Vlad')}
        title="Vertex AI communication"
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
