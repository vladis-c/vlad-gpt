import {createContext, useEffect, useState} from 'react';
import {Name} from '../types';
import db from '../api/db';

type NamesContextProps = {
  names: Name[];
  setNames: Setter<Name[]>;
};

export const NamesContext = createContext({} as NamesContextProps);

const NamesContextProvider = ({children}: {children: React.ReactNode}) => {
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    (async () => {
      const res = await db.getDocs();
      if (res) {
        setNames(res);
      }
    })();
  }, []);

  useEffect(() => {
    console.log('Names:', names);
  }, [names]);

  return (
    <NamesContext.Provider value={{names, setNames}}>
      {children}
    </NamesContext.Provider>
  );
};

export default NamesContextProvider;
