import axios from 'axios';

export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(
      'http://localhost:30766/chat/message',
      messageData
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
