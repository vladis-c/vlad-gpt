import {useContext} from 'react';
import {MessagesContext} from '../context/MessagesContext';
import ai from '../api/ai';
import {Message} from '../types';

const useCommunicate = () => {
  const {setMessages, messages} = useContext(MessagesContext);

  const communicate = async (message: Message<'user'>) => {
    const aiMessage = await ai.communicate(message);
    console.log('useCommunicate() communicate() prev messages', messages);
    console.log('useCommunicate() communicate() Ai message', aiMessage);
    if (aiMessage) {
      setMessages([...messages, aiMessage]);
    }
  };
  return {communicate};
};

export default useCommunicate;
