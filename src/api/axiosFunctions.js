import axios from 'axios';

const baseURL = 'https://api.americanfleetinsurance.com';

export const sendDotAxios = async (dotNumber) => {
  try {
    const response = await axios.post(baseURL + '/dotnumber', {
      "dotNumber": dotNumber
    })
    return response.data;
  } catch (error) {
    console.log(error);
  };
};
