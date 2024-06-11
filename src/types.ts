import {Timestamp} from '@react-native-firebase/firestore';

export type Name = {
  id: number;
  name: string;
  createdAt: Timestamp;
};

export type Message = {
  role: 'system' | 'user';
  content: string;
};
