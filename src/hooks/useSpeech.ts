import {useContext, useEffect, useState} from 'react';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';

import {NamesContext} from '../context/NamesContext';
import db from '../api/db';

const useSpeech = () => {
  const [speech, setSpeech] = useState('');
  const [ended, setEnded] = useState(false);
  const {setNames} = useContext(NamesContext);

  useEffect(() => {
    (async () => {
      if (ended) {
        const res = await db.getDocs();
        if (res) {
          setNames(res);
        }
      }
    })();
  }, [ended]);

  const startListening = async () => {
    setEnded(false);
    setSpeech('');
    await Voice.start('en_US');
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      setSpeech(e.value.join(''));
    }
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      setSpeech(e.value[0]);
    }
    setEnded(true);
  };

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
