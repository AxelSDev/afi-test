import axios from 'axios';

const baseURL = 'https://api.americanfleetinsurance.com';

export const sendDotAxios = async (dotNumber) => {
  try {
    const response = await axios.post(baseURL + '/dotnumber', {
      "dotNumber": dotNumber
    })
    const garageState = response.data.phyState || '';
    const garageZip = response.data.phyZipcode || '';
    const drivers = response.data.totalDrivers || 0;
    const trucks = response.data.totalPowerUnits || 0;
    const legalName = response.data.legalName || '';
    const address = response.data.phyStreet || '';
    const city = response.data.phyCity || '';
    return {
      garageState,
      garageZip,
      drivers,
      trucks,
      legalName,
      address,
      city
    }
  } catch (error) {
    console.log(error);
  };
};
