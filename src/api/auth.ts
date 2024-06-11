import fbAuth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

const login = async () => {
  try {
    const res = await fbAuth().signInAnonymously();
    if (res.user) {
      console.log('login() Signed in as:', res.user);
    } else {
      throw new Error('login() Error when signing in');
    }
  } catch (error) {
    console.error('login() Error:', error);
    Alert.alert('App authentication error');
  }
};

const authenticated = fbAuth().currentUser ? true : false;

const auth = {login, authenticated};
export default auth;
