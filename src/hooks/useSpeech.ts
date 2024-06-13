import {useEffect, useState} from 'react';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import useCommunicate from './useCommunicate';

type UseSpeechProps = {onOpenNamesScreen: () => void};

const useSpeech = ({onOpenNamesScreen}: UseSpeechProps) => {
  const [speech, setSpeech] = useState<string[]>([]);
  const [ended, setEnded] = useState(false);

  const {communicate} = useCommunicate();

  const startListening = async () => {
    setEnded(false);
    setSpeech([]);
    await Voice.start('en_US');
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      setSpeech(e.value);
    }
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      setSpeech(e.value);
    }
    setEnded(true);
  };

  useEffect(() => {
    if (speech.length > 0 && ended) {
      communicate(speech, 1, onOpenNamesScreen);
    }
  }, [speech, ended]);

  useEffect(() => {
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {speech, startListening};
};
export default useSpeech;
