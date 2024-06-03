import {useEffect} from 'react';
import auth from '../api/auth';

const usePrefetch = () => {
  useEffect(() => {
    auth.login();
  }, []);
};

export default usePrefetch;
