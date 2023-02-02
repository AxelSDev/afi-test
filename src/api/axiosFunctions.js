import axios from 'axios';
import { saveInsuranceLocalStorage } from './insuranceLocalStorage';

const baseURL = 'https://api.americanfleetinsurance.com';

const changeDate = (date) => {
  let policyDate = date.split("-");
  policyDate.push(policyDate.shift());
  return policyDate.join("/");
};

export const getTotalAxios = async (insurance) => {
  const validDate = changeDate(insurance.policyStartDate);

  const vehiclesArray = {};
  for(let i = 0; i < insurance.trucks; i++) {
    vehiclesArray[i] = {
      vin: "3AKJGEBG0ESFS1507",
      year: "2014",
      make: "Freightliner",
      model: "Cascadia",
      value: insurance.avgValueTruck,
      classKey: "8",
      bodyTypeKey: "tractor",
      deductibleType: "FollowsPolicy",
      deductible: "1000"
   };
  };

  const driversArray = {};
  for(let i = 0; i < insurance.drivers; i++) {
    driversArray[i] = {
      firstName: "Ralph",
      lastName: "Machio",
      licenseState: "TX",
      licenseNumber: "string",
      dateOfBirth: "12/12/1972",
      dateOfHire: "12/12/2020",
      yearsExperience: "5",
      eligibility: "Covered",
      accidents_total: "0",
      violations_total: "0",
      suspensions_total: "0"
    };
  };

  const trailersArray = {};
  for(let i = 0; i < insurance.trailers; i++) {
    trailersArray[i] = {
      "vin": "t0000000000000001",
      "year": "2020",
      "make": "Travelstar",
      "model": "Fastback",
      "value": "15000",
      "bodyTypeKey": "utility_trailer",
      "deductibleType": "FollowsPolicy",
      "deductible": "1500"
    };
  };

  let mtcvalue = 'Y';
  let mtclimitvalue = 0;
  if (insurance.motorTruckCargo === 'N') {
    mtcvalue = 'N';
  } else {
    mtclimitvalue = insurance.motorTruckCargo;
  };

  const data = {
    coverage: {
      requestAl: insurance.autoLiabilityStatus,
      optAlPip: insurance.personalInjuryProtection,
      optAlUm: insurance.uninsured,
      requestApd: insurance.physicalDamage,
      requestMtc: mtcvalue,
      requestTgl: "Y",
      requestNtl: insurance.nonTruckingLiability,
      effectiveDate: validDate
    },
    insuredInformation: {
      ownerName: insurance.firstName + ' ' + insurance.lastName,
      dotNumber: insurance.dotNumber,
      email: "test@mail.com",
      legalName: "Test 200-1",
      dbaName: "Test 200-1",
      yearsInBusiness: insurance.businessYears,
      monthsInBusiness: "0",
      insuranceContactFirstName: insurance.firstName,
      insuranceContactLastName: insurance.lastName,
      insuranceContactPhone: insurance.phone,
      insuranceContactEmail: insurance.email
    },
    limits: {
      trailerInterchange: "N",
      trailerInterchangeLimit: "30000",
      limitTowingStorage: "7500",
      nbrOfTrucks: insurance.trucks,
      valueOfTrucks: insurance.avgValueTruck,
      nbrOfTrailers: insurance.trailers,
      valueOfTrailers: "5000",
      limitAutoLiability: insurance.autoLiability,
      mtcLimit: mtclimitvalue
    },
    operations: {
      opsLocal: "Y",
      opsIntermediate: "N",
      opsLongHaul: "Y",
      opsIntermodalPort: "N",
      opsDumpTruckOther: "N",
      opsDumpTruckSandGravel: "N",
      opsEndDumper: "N",
      opsLogging: "N",
      opsRefrigirated: "N",
      opsHotShot:"N",
      opsOversizedOvernight: "N",
      opsAutomobileHauler: "N",
      opsHouseholdGoods: "N",
      opsTanker: "N",
      ineligibleOperations: "N",
      filingsAlFederal: "N",
      filingsAlState: "N",
      priorInsuranceCancelledNonrenewed: "N"
    },
     garageAddress: {
      garageStreet: "10942 Wrenwood Grn",
      garageCity: "Houston",
      garageState: insurance.garageState,
      garageZip: insurance.garageZip,
      garageCounty: "",
      garageCountry: "string"
     },
    radius: {
      radius0_50: "0",
      radius51_200: "50",
      radius201_500: "50",
      radius501: "0"
    },
    commoditiesRefrigeration: "N",
    commodities: [
      {
        commodityKey: "general_merchandise",
        commodityPercentage: "100"
      }
    ],
    vehicles: vehiclesArray,
    drivers: driversArray,
    trailers: trailersArray,
    losses: {
      0:{
        lossConfirmed: "Y",
        lossAlCount: "1",
        lossAlPaid: "75000",
        lossApdCount: "0",
        lossApdPaid: "0",
        lossMtcCount: "0",
        lossMtcPaid: "0",
        lossTglCount: "0",
        lossTglPaid: "0",
        lossNtlCount: "0",
        lossNtlPaid: "0"
       }
    },
    retailAgent: {
      FirstName: "Joe",
      LastName: "Agentzzz",
      Phone: "5555555555",
      Email: "Joe@mail.com",
      AgencyName: "Trucking",
      Street: "10 Main Street",
      City: "Chicago",
      State: "IL",
      Zip: "90201"
  }};

  const insuranceData = {};

  await axios.post(baseURL + '/getsubmission', data)
  .then(function (response) {
    insuranceData.premium = response.data.totalpremium || 0;
    response.data.coverages.al ? insuranceData.al = response.data.coverages.al : insuranceData.al = 0;
    response.data.coverages.apd ? insuranceData.apd = response.data.coverages.apd : insuranceData.apd = 0;
    response.data.coverages.mtc ? insuranceData.mtc = response.data.coverages.mtc : insuranceData.mtc = 0;
    response.data.coverages.tgl ? insuranceData.tgl = response.data.coverages.tgl : insuranceData.tgl = 0;
    response.data.coverages.ntl ? insuranceData.ntl = response.data.coverages.ntl : insuranceData.ntl = 0;
    response.data.submission_number ? insuranceData.submissionNmber = response.data.submission_number : insuranceData.submissionNmber =  0;
    saveInsuranceLocalStorage(insurance);
  })
  .catch(function (error) {
    console.log(error);
  });
  return insuranceData;
};

export const getTokenAxios = async () => {
  await axios.post(baseURL + '/gettoken',{
    "username": "coverwhaleapi@teamafi.com",
    "password": "Hexokinase99!"
  })
};

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

export const postCSVAxios1 = async (file) => {
  const formData = new FormData();
  formData.append("indication", file);
  await axios.post(baseURL + '/uploadindication', formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then(function (response) {
    //handle success
    console.log(response);
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });
};

export const postCSVCarrierSoftwareAxios = async (file, upploadLink) => {
  const formData = new FormData();
  upploadLink === "/uploadcarriersoftware" && formData.append("carriersoftware", file);
  upploadLink === "/internalbulk" && formData.append("bulk", file);
  await axios.post(baseURL + upploadLink, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });
};

export const getFromSubmissionNumber = async (submissionNmber) => {
  try {
    const response = await axios.get(baseURL + `/submissionnumber/${submissionNmber}`)
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  };
}
