import fbAuth from '@react-native-firebase/auth';

const login = async () => {
  try {
    const res = await fbAuth().signInAnonymously();
    if (res) {
      console.log('login() Signed in as:', res);
    } else {
      throw new Error('login() Error when signing in');
    }
  } catch (error) {
    console.error('login() Error:', error);
  }
};

const authenticated = fbAuth().currentUser ? true : false;

const auth = ({login, authenticated});
export default auth;
