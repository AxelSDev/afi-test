let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

export const saveInsuranceLocalStorage = (data) => {
  localStorage.setItem('insuranceForm', JSON.stringify(data));
};

export const getInsuranceLocalStorage = (data) => {
  
  if (!localStorage.getItem(data)) {
    const insuranceForm = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dotNumber: 0,
      businessYears: 5,
      garageState: 'AL',
      garageZip: '',
      drivers: 1,
      trucks: 1,
      avgValueTruck: 40000,
      trailers: 0,
      autoLiability: '750000',
      autoLiabilityStatus: 'Y',
      personalInjuryProtection: 'Y',
      uninsured: 'Y',
      physicalDamage: 'Y',
      motorTruckCargo: 'N',
      nonTruckingLiability: 'Y',
      policyStartDate: today
    };
    return insuranceForm;
  };
  return JSON.parse(localStorage.getItem(data));
};

export const saveCompanyPDFLocalStorage = (data) => {
  localStorage.setItem('companyPDF', JSON.stringify(data));
};

export const getCompanyPDFLocalStorage = () => {
  return JSON.parse(localStorage.getItem('companyPDF'));
};

export const saveInsuranceCostumerFormLocalStorage = (data) => {
  localStorage.setItem('costumerInsurance', JSON.stringify(data));
};

export const getInsuranceCostumerFormLocalStorage = () => {
  if (!localStorage.getItem('costumerInsurance')) {
    const insuranceForm = {
      dotNumber: 0,
      businessYears: 5,
      coverageStartDate: today,
      companyName: '',
      garageState: 'selectState',
      garageZip: 0,
      trucks: 0,
      drivers: 0,
      userName: '',
      email: '',
      phone: '',
      radiusDriving: '0'
    };
    return insuranceForm;
  };
  return JSON.parse(localStorage.getItem('costumerInsurance'));
};
