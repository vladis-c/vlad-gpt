import {Timestamp} from '@react-native-firebase/firestore';

export type Name = {
  id: number;
  name: string;
  createdAt: Timestamp;
};

// REQUEST

const ROLE = {
  USER: 'user',
  MODEL: 'model',
} as const;

export type Role = ObjectValues<typeof ROLE>;

export type Message<R extends Role = 'user'> = {
  [K in R extends 'user' ? 'contents' : 'content']: {
    role: Role;
    parts: {text: string}[];
  };
};

// RESPONSE
export type AIResponse = {
  candidates: Message<'model'>[];
};
