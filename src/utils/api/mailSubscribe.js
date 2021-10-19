import axios from 'axios';

const MAIL_SUBSCRIBE_URL = 'https://shielded-sands-48363.herokuapp.com/addContact';

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const handleMailSubscribe = async (email) => {
  if (isValidEmail(email)) {
    const config = {
      headers: { 'Access-Control-Allow-Origin': '*' },
      params: {
        email,
      },
    };
    try {
      const response = await axios.get(MAIL_SUBSCRIBE_URL, config);
      return response;
    } catch (error) {
      console.error(error);
      return 'OOPS! Something went wrong.';
    }
  } else {
    return 'Email address is invalid.';
  }
};
