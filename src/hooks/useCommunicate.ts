import {Alert} from 'react-native';
import {useContext} from 'react';

import {MessagesContext} from '../context/MessagesContext';
import ai from '../api/ai';
import {NamesContext} from '../context/NamesContext';
import useSetDoc from './useSetDoc';

const NO_NAME = 'Suitable name not found';

const useCommunicate = () => {
  const {setMessages, messages} = useContext(MessagesContext);
  const {names} = useContext(NamesContext);
  const {setDoc} = useSetDoc();

  const communicate = async (list: string[], message: 1 | 2, callback: () => void) => {
    const MESSAGE_1 = `
    Inspect the following list of names: ${list.join(', ')}.\n
    They all should be the variations of a name 'Vladislav'.\n
    You have to find me one, which is closer to this name.\n
    If none of them were close to the name 'Vladislav', then try to change letters or combinations from the inspected list of names, and try to give the possible corrected word that is something in between what was in the list to the required name 'Vladislav':
    maybe change a letter or a part of the word of one of the names from the list.
    Reply only with one selected name. Or if there is no name close to 'Vladislav', reply with "${NO_NAME}"
    `;

    const MESSAGE_2 = `
    Here is the list of variations of a name 'Vladislav': ${names
      .map(({name}) => name)
      .join(', ')}.\n
    Now I want to add a new name to this list: ${list.join(', ')}.\n
    Inspect the list: if the name already exists in the list.\n
    If the name already exists, create a new funny name, or use new from existing ones in the world.\n
    Reply to me with the new name options. 
    `;

    const finalMessage = message === 1 ? MESSAGE_1 : MESSAGE_2;

    const aiMessage = await ai.communicate({
      contents: {
        role: 'user',
        parts: [{text: finalMessage}],
      },
    });

    if (aiMessage) {
      setMessages([...messages, aiMessage]);
      if (message === 1) {
        const suitableName = aiMessage.contents.parts
          .map(el => el.text)
          .join('')
          .replace(/[^\w\s]/gi, ''); // removes special charachters
        if (suitableName.includes(NO_NAME)) {
          Alert.alert('Please record the voice again');
        } else {
          Alert.alert(
            'Suitable name found',
            `Out of the list ${list.join(
              ', ',
            )}, the most suitable name is ${suitableName}`,
            [
              {
                text: 'Add',
                onPress: async () => {
                  await setDoc(suitableName);
                  callback()
                },
              },
              {text: 'Cancel', onPress: () => {}},
            ],
          );
        }
      }
    }
  };
  return {communicate};
};

export default useCommunicate;
