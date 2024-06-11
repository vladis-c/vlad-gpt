import {useContext} from 'react';
import db from '../api/db';
import {NamesContext} from '../context/NamesContext';

const useSetDoc = () => {
  const {setNames, names} = useContext(NamesContext);
  const setDoc = async (name: string) => {
    try {
      await db.setDoc(name, names[names.length - 1].id).then(async () => {
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
