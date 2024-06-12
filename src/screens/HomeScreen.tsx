import {Text, View, StyleSheet, Button} from 'react-native';
import {HomeScreenNavigationProps, MAIN_NAV} from '../navigation';
import useSpeech from '../hooks/useSpeech';
import useSetDoc from '../hooks/useSetDoc';
import useCommunicate from '../hooks/useCommunicate';
import {useContext} from 'react';
import {MessagesContext} from '../context/MessagesContext';

const HomeScreen = ({navigation}: HomeScreenNavigationProps) => {
  const {speech, startListening} = useSpeech();
  const {messages, setMessages} = useContext(MessagesContext);
  const {setDoc} = useSetDoc();
  const {communicate} = useCommunicate();

  return (
    <View style={styles.container}>
      <Text>Press to talk!</Text>
      <Text>{speech}</Text>
      <Button onPress={startListening} title="Text to speech" />
      <View style={{height: 50}} />
      {speech ? (
        <>
          <Button
            onPress={() =>
              setMessages([
                ...messages,
                {contents: {role: 'user', parts: [{text: speech}]}},
              ])
            }
            title={`Add "${speech}" to the list`}
          />
          <View style={{height: 50}} />
        </>
      ) : null}
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
        onPress={() =>
          communicate({
            contents: {
              role: 'user',
              parts: [{text: speech}],
            },
          })
        }
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
