import {useContext} from 'react';
import {MessagesContext} from '../context/MessagesContext';
import ai from '../api/ai';
import {Message} from '../types';
import {NamesContext} from '../context/NamesContext';

const useCommunicate = () => {
  const {setMessages, messages} = useContext(MessagesContext);
  const {names} = useContext(NamesContext);

  const communicate = async (name: string) => {
    const MESSAGE_TO_AI = `
    Here is the list of variations of a name 'Vladislav': ${names
      .map(({name}) => name)
      .join(', ')}.\n
    Now I want to add a new name to this list: ${name}.\n
    Inspect the list: if the name already exists in the list.\n
    If the name already exists, create a new funny name, or use new from existing ones in the world.\n
    Reply to me with the new name options. 
    `;
    console.log('__useCommunicate()__Message to AI', MESSAGE_TO_AI);

    const aiMessage = await ai.communicate({
      contents: {
        role: 'user',
        parts: [{text: MESSAGE_TO_AI}],
      },
    });

    if (aiMessage) {
      setMessages([...messages, aiMessage]);
    }
  };
  return {communicate};
};

export default useCommunicate;
