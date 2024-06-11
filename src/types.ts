import {Timestamp} from '@react-native-firebase/firestore';

export type Name = {
  id: number;
  name: string;
  createdAt: Timestamp;
};
