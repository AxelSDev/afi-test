let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

export const saveInsuranceCostumerFormLocalStorage = (data) => {
  localStorage.setItem('costumerInsurance', JSON.stringify(data));
};

export const getInsuranceCostumerFormLocalStorage = () => {
  if (!localStorage.getItem('costumerInsurance')) {
    const insuranceForm = {
      dotNumber: '',
      businessYears: '',
      coverageStartDate: today,
      companyName: '',
      garageState: 'selectState',
      garageZip: '',
      trucks: '',
      drivers: '',
      userName: '',
      email: '',
      phone: '',
      radiusDriving: '0'
    };
    return insuranceForm;
  };
  return JSON.parse(localStorage.getItem('costumerInsurance'));
};
