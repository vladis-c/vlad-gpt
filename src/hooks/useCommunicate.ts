import {useContext} from 'react';
import {MessagesContext} from '../context/MessagesContext';
import openai from '../api/openai';
import {Message} from '../types';

const useCommunicate = () => {
  const {setMessages, messages} = useContext(MessagesContext);

  const communicate = async (
    message: Omit<Message, 'role'> & {role: Exclude<Message['role'], 'system'>},
  ) => {
    await openai.communicate([...messages, message]);
    setMessages([]);
  };
  return {communicate};
};

export default useCommunicate;
