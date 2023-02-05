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

export const postPDFAxios = async (formData) => {
  try {
    const response = await axios.post(baseURL + '/uploadpdf', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data;
  } catch (error) {
    console.log(error);
  };
};
