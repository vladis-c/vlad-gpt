import axios from 'axios';
import {Alert} from 'react-native';
import {Message} from '../types';

const OPEN_AI_API_KEY = process.env.EXPO_PUBLIC_OPEN_AI_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const communicate = async (messages: Message[]) => {
  try {
    console.log(OPEN_AI_API_KEY, BASE_URL);
    if (!OPEN_AI_API_KEY || !BASE_URL) {
      throw new Error('Missing variable');
    }
    const res = await axios.post(BASE_URL, {
      body: {messages},
      headers: {
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      },
    });
    console.log('res', res.data);
  } catch (error) {
    console.error('communicate() Error:', error);
    Alert.alert('Communication error');
  }
};

const openai = {communicate};
export default openai;
