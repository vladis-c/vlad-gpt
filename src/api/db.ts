import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {Name} from '../types';

const COLLECTION = {
  NAMES: 'names',
} as const;

const getDocs = async () => {
  try {
    const res = await firestore().collection(COLLECTION.NAMES).get();
    const docs = res.docs.map(doc => doc.data());
    return docs as Name[];
  } catch (error) {
    console.error('getDocs() Error:', error);
    Alert.alert('Error when getting database');
    return undefined;
  }
};

const setDoc = async (name: Name['name'], lastId: Name['id'] = 0) => {
  const doc = {
    name,
    createdAt: Timestamp.now(),
    id: lastId + 1,
  } as Name;
  try {
    await firestore()
      .collection(COLLECTION.NAMES)
      .doc(doc.id.toString())
      .set(doc)
      .then(() => console.log('Name added:', doc));
  } catch (error) {
    console.error('setDoc() Error:', error);
    Alert.alert('Error when writing to database');
  }
};

const db = {getDocs, setDoc};

export default db;
