import axios from 'axios';

export const sendMessageToLine = async (message) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${YOUR_CHANNEL_ACCESS_TOKEN}`
  };
  const data = {
    to: 'USER_ID', // replace with the Line user ID you want to send the message to
    messages: [
      {
        type: 'text',
        text: message
      }
    ]
  };
  try {
    const response = await axios.post('https://api.line.me/v2/bot/message/push', data, { headers });
    console.log(response.data); // log the response from Line
  } catch (error) {
    console.error(error);
  }
}