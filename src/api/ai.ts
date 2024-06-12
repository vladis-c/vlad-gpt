import axios from 'axios';
import {Alert} from 'react-native';
import {AIResponse, Message} from '../types';

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API;
const BASE_URL = process.env.EXPO_PUBLIC_GOOGLE_URL;

const parseAIResponse = (response: AIResponse[]): Message<'user'> => {
  let combinedText = '';
  response.forEach(obj => {
    obj.candidates.forEach(candidate => {
      candidate.content.parts.forEach(part => {
        combinedText += part.text;
      });
    });
  });

  return {
    contents: {
      role: 'model',
      parts: [{text: combinedText}],
    },
  };
};

const communicate = async (message: Message<'user'>) => {
  try {
    console.log(API_KEY, BASE_URL);
    if (!API_KEY || !BASE_URL) {
      throw new Error('Missing variable');
    }
    const res = await axios.post(BASE_URL, message, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const parsedAIResponse = parseAIResponse(res.data);
    return parsedAIResponse;
  } catch (error) {
    console.log('communicate() Error:', error);
    Alert.alert('Communication error');
    return undefined;
  }
};

const ai = {communicate};
export default ai;
