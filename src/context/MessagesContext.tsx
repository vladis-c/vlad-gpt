import {createContext, useEffect, useState} from 'react';
import {Message} from '../types';

type MessagesContextProps = {
  messages: Message[];
  setMessages: Setter<Message[]>;
};

export const MessagesContext = createContext({} as MessagesContextProps);

const MessagesContextProvider = ({children}: {children: React.ReactNode}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <MessagesContext.Provider value={{messages, setMessages}}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
