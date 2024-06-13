import axios from 'axios';

export const chatUserRegister = async (userData) => {
  try {
    const response = await axios.post('http://localhost:30766/chat/user/register', userData);
    return response.data;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};