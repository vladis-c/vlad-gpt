import {useContext, useEffect} from 'react';
import db from '../api/db';
import {NamesContext} from '../context/NamesContext';

const useGetDocs = () => {
  const {setNames} = useContext(NamesContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await db.getDocs();
        if (res) {
          setNames(res);
        } else {
          throw new Error('Error when getting names');
        }
      } catch (error) {
        console.log('useGetDocs() error', error);
      }
    })();
  }, []);
};

export default useGetDocs;
