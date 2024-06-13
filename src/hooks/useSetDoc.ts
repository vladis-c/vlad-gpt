import {Alert} from 'react-native';
import {useContext} from 'react';
import db from '../api/db';
import {NamesContext} from '../context/NamesContext';

const useSetDoc = () => {
  const {setNames, names} = useContext(NamesContext);
  const setDoc = async (name: string) => {
    try {
      const words = name.split(' ');
      if (words.length > 2) {
        Alert.alert('Name must be max 2 words');
        throw new Error('Name must be max 2 words');
      }
      await db
        .setDoc(name, names?.[names.length - 1]?.id ?? 0)
        .then(async () => {
          const updatedDocs = await db.getDocs();
          if (updatedDocs) {
            setNames(updatedDocs);
          }
        });
    } catch (error) {
      console.log('useSetDoc error:', error);
    }
  };
  return {setDoc};
};

export default useSetDoc;
