import { useState } from "react";
import { Steps, useSteps } from "react-step-builder";
import ComercialTruck from "../ComercialTruck/ComercialTruck";
import { sendDotAxios } from "../../api/axiosFunctions";
import { getInsuranceCostumerFormLocalStorage, saveInsuranceCostumerFormLocalStorage } from "../../api/insuranceLocalStorage";
import AddVehiclesModal from "../modals/AddVehiclesModal";
import AddDriversModal from "../modals/AddDriversModal";
import Circles from "./Circles";
import usStates from '../../data/us-states-with-quotes.json';
import { RxCopy } from "react-icons/rx";
import './MultiStepsForm.css';

const CostumerMultiStepsForm = () => {
  const { next, current, total } = useSteps();
  const [isCopied, setIsCopied] = useState(false);
  const [comercialForm, setComercialForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dotChecked, setDotChecked] = useState(false);
  const [insuranceForm, setInsuranceForm] = useState(getInsuranceCostumerFormLocalStorage());
  const [coverage, setCoverage] = useState({
    al: false,
    ntl: false,
    pd: false,
    mtc: false,
    gl: false
  });

  const handleChange = (event) => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    if (inputName === "coverage") {
      setCoverage((prevState)=> {
        return({
          ...prevState,
          [newValue]: !coverage[newValue],
        });
      });
      return;
    }
    setInsuranceForm((prevState)=> {
      return({
        ...prevState,
        [inputName]: newValue,
      });
    });
  };

  const handleStep1Submit = async (event) => {
    event.preventDefault();
    if (dotChecked || ['0', ''].includes(insuranceForm.dotNumber)) {
      next();
      return;
    };
    const response = await sendDotAxios(insuranceForm.dotNumber);
    if (response) {
      setInsuranceForm((prevState)=> {
        return({
          ...prevState,
          "garageState": response.phyState,
          "garageZip": response.phyZipcode,
          "drivers": response.totalDrivers || '0',
          "trucks": response.totalPowerUnits || '0',
          "companyName": response.legalName,
          "city": response.phyCity,
          "address": response.phyStreet
        });
      });
      next();
    } else {
      alert('Invalid DOT Number')
    }
  };

  const handleStep2Submit = async (event) => {
    event.preventDefault();
    next();
  };

  const handleStep3Submit = async (event) => {
    event.preventDefault();
    next();
  };

  const handleStep4Submit = async (event) => {
    event.preventDefault();
    next();
  };

  const handleStep5Submit = async (event) => {
    event.preventDefault();
    next();
  };

  const handleFinalSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setComercialForm(true);
    }, "1500")
    saveInsuranceCostumerFormLocalStorage(insuranceForm);
  };

  const [vehiclesArray, setVehiclesArray] = useState([
      {
        vin: '1NPALU9XX7N662029',
        year: '2019',
        make: 'make',
        model: 'Freightliner Cascadia',
        value: 'value'
      },
      {
        vin: '1NPALU9XX7N662027',
        year: '2019',
        make: 'make',
        model: 'Freightliner Cascadia',
        value: 'value'
      },
      {
        vin: '1NPALU9XX7N662028',
        year: '2019',
        make: 'make',
        model: 'Freightliner Cascadia',
        value: 'value'
      }
    ]
  );
  // const driversArray = [
  //   {
  //     first_name: 'first',
  //     last_name: 'last',
  //     license_number: 'license_number',
  //     license_state: 'license_state',
  //     years_experience: 'years_experience',
  //     date_hire: 'date_hire',
  //     date_birth: 'date_birth',
  //     elegibility: 'elegibility',
  //     accidents: 'accidents',
  //     violations: 'violations',
  //     suspensions: 'suspensions'
  //   },
  // ]

  const removeVehicleStatus = (index) => {
    let newArr = [...vehiclesArray];
    newArr[index].remove = true; 
    setVehiclesArray(newArr);
  };

  const acceptVehicleStatus = (index) => {
    let newArr = [...vehiclesArray];
    newArr[index].remove = false; 
    setVehiclesArray(newArr);
  };

  const [modalDriver,setModalDriver] = useState('modal_inactive');
  const [modalVehicle,setModalVehicle] = useState('modal_inactive');
  const copyText = `https://myafiquote.com/${insuranceForm.dotNumber}/addDriver`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(copyText)
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div className="multiStepsFormPage">
      { comercialForm ?
        <ComercialTruck insuranceData={insuranceForm} coverage={coverage} />
        :
        <>
          <h2 className="lg:text-3xl lg:mt-4">RAPID QUOTE</h2>
          <div className="circlesDiv">
            <Circles circleNumber={total} current={current} />
          </div>
          <Steps>
            <form onSubmit={handleStep1Submit} className="multiStepsForm">
              <label className="CostumerMultiStepsLabel">
                <h4 className="w-fit pl-4 text-xl">DOT Number</h4>
                {!dotChecked && <input name="dotNumber" type="number" pattern="\d*" className="multistepsinput" id="dotNumberInput" onChange={handleChange} value={insuranceForm.dotNumber} />}
                <div className="flex items-center pl-4">
                  <input type="checkbox" className="w-fit mr-4" checked={dotChecked} onChange={() =>setDotChecked(!dotChecked)} />I do not have a DOT number yet
                </div>
              </label>
              <label className="CostumerMultiStepsLabel">
                <h4 className="w-fit pl-4 text-xl">Years In Business</h4>
                <input name="businessYears" type="number" pattern="\d*" className="multistepsinput" onChange={handleChange} value={insuranceForm.businessYears} />
              </label>
              <label className="CostumerMultiStepsLabel">
                <h4 className="w-fit pl-4 text-left text-xl">When would you like to start?</h4>
                <input name="coverageStartDate" type="date" className="multistepsinput appearance-none" onChange={handleChange} value={insuranceForm.coverageStartDate} />
              </label>
              <button type="submit" className="flex justify-center items-center text-white bg-blue-900 rounded-xl py-2 px-8 my-auto">
                <p className="w-fit lg:text-xl">Continue</p>
                <p className="text-2xl w-fit ml-1 lg:text-3xl">&#8594;</p>
              </button>
            </form>
            <form onSubmit={handleStep2Submit}  className="lg:grid lg:grid-cols-2 lg:gap-x-12 min-h-[55vh] lg:w-3/5">
              <h3 className="lg:text-xl lg:col-span-2">Please confirm the below information.</h3>
              <label className="CostumerMultiStepsLabel lg:col-span-2">
                <h4 className="w-fit pl-4 text-xl">Company Name</h4>
                <input name="companyName" type="text" className="multistepsinput" onChange={handleChange} value={insuranceForm.companyName} />
              </label>
              <label className="CostumerMultiStepsLabel">
                <h4 className="w-fit pl-4 text-xl">Garage State</h4>
                <select name="garageState" className="multiStepsselect" onChange={handleChange} value={insuranceForm.garageState}>
                  <option value="selectState">Select State</option>
                  {usStates.map((state) => (
                    <option key={state.id} value={state.value_back}>{state.value}</option>
                  ))}
                </select>
              </label>
              <label className="CostumerMultiStepsLabel">
                <h4 className="w-fit pl-4 text-xl">Garage Zip Code</h4>
                <input name="garageZip" type="number" pattern="\d*" className="multistepsinput" onChange={handleChange} value={insuranceForm.garageZip} />
              </label>
              <label className="CostumerMultiStepsLabel">
                <h4 className="w-fit pl-4 text-xl">Number of Trucks</h4>
                <input name="trucks" type="number" pattern="\d*" className="multistepsinput" onChange={handleChange} value={insuranceForm.trucks} />
              </label>
              <label className="CostumerMultiStepsLabel mb-4">
                <h4 className="w-fit pl-4 text-xl">Number of Drivers</h4>
                <input name="drivers" type="number" pattern="\d*" className="multistepsinput" onChange={handleChange} value={insuranceForm.drivers} />
              </label>
              <button type="submit" className="flex justify-center items-center text-white bg-blue-900 rounded-xl py-2 px-8 my-auto lg:col-span-2">
                <p className="w-fit lg:text-xl">Continue</p>
                <p className="text-2xl w-fit ml-1 lg:text-3xl">&#8594;</p>
              </button>
            </form>
            <form onSubmit={handleStep3Submit}  className="flex flex-col items-center min-h-[75vh] lg:w-3/5">
              <h3 className="lg:text-xl w-5/6 mb-2">We found a few vehicles associated with your DOT number.</h3>
              <div className="max-h-[50vh] overflow-y-scroll flex flex-col rounded vehicles_table">
                {vehiclesArray.map((vehicle, index) => (
                <div className="flex px-4 pt-2 lg:px-8" key={vehicle.vin}>
                  <div>
                    <h4 className="text-left font-bold text-md lg:text-3xl">{vehicle.year} {vehicle.model}</h4>
                    <h5 className="text-left text-sm lg:text-xl">VIN: {vehicle.vin}</h5>
                    <h6 className={`text-left text-sm font-bold ${vehicle.remove ? "text-red-700" : "invisible"}`}>Not Included</h6>
                  </div>
                  <div className="flex justify-evenly items-start w-fit gap-x-2 text-xl lg:text-3xl">
                    <button
                      type="button"
                      className={`pb-2 pt-1 rounded-xl w-[36px] lg:w-[64px] text-white font-bold ${vehicle.remove ? "bg-gray-500" : "bg-green-700"}`}
                      onClick={() => acceptVehicleStatus(index)}>
                      +
                    </button>
                    <button
                      type="button"
                      className={`pb-2 pt-1 rounded-xl w-[36px] lg:w-[64px] text-white font-bold ${vehicle.remove ? "bg-red-700" : "bg-gray-500"}`}
                      onClick={() => removeVehicleStatus(index)}>
                      -
                    </button>
                  </div>
                </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setModalVehicle('modal_active')}
                className="rounded-3xl w-5/6 text-white font-bold py-2 px-8 mb-8 bg-green-700 mt-8 lg:text-xl lg:w-1/2">
                + Add Vehicle
              </button>
              <div className={modalVehicle}>
                <AddVehiclesModal setModalVehicle={setModalVehicle} vehiclesArray={vehiclesArray} setVehiclesArray={setVehiclesArray} />
              </div>
              <button type="submit" className="flex justify-center items-center text-white bg-blue-900 rounded-xl py-2 px-8 my-auto">
                <p className="w-fit lg:text-xl">Continue</p>
                <p className="text-2xl w-fit ml-1 lg:text-3xl">&#8594;</p>
              </button>
            </form>
            <form onSubmit={handleStep4Submit}  className="flex flex-col items-center min-h-[75vh] lg:w-3/5">
              <h3 className="lg:text-xl w-3/4 my-2">Copy the link below and text it to your {insuranceForm.drivers} drivers.</h3>
              <h3 className="lg:text-xl w-3/4 my-2">We will let you know when each driver completes the form.</h3>
              <div className="flex items-center mt-4 border-slate-300 border-2 rounded-3xl p-2 lg:w-1/2 lg:mt-8">
                <input type="text" value={copyText} className="bg-white lg:px-2" readOnly />
                <button type="button" onClick={handleCopyLink} className="w-fit">
                  <RxCopy />
                </button>
              </div>
              {isCopied && <span>'Copied!'</span>}
              <p className="font-bold text-xl my-4">OR</p>
              <p className="lg:text-xl w-3/4 my-2">If you have your drivers information available, add each driver.</p>
              <button type="button" onClick={() => setModalDriver('modal_active')} className="rounded-3xl w-5/6 text-white font-bold py-2 px-8 bg-green-700 my-6 lg:w-1/2 lg:text-xl">+ Add Driver</button>
              <div className={modalDriver}>
                <AddDriversModal setModalDriver={setModalDriver} />
              </div>
              <button type="submit" className="flex justify-center items-center text-white bg-blue-900 rounded-xl py-2 px-8 my-auto">
                <p className="w-fit lg:text-xl">Continue</p>
                <p className="text-2xl w-fit ml-1 lg:text-3xl">&#8594;</p>
              </button>
            </form>
            <form onSubmit={handleStep5Submit}  className="multiStepsForm">
              <label className="CostumerMultiStepsLabel">
                <h4 className="w-fit pl-4 text-xl">Your Name</h4>
                <input name="userName" type="text" className="multistepsinput" onChange={handleChange} value={insuranceForm.userName} />
              </label>
              <label className="CostumerMultiStepsLabel">
                <div className="flex justify-start items-center">
                  <h4 className="w-fit pl-4 text-left text-xl">Email</h4>
                  <p className="text-sm w-fit ml-2 italic">(Where we will email your quote)</p>
                </div>
                <input name="email" type="email" className="multistepsinput" onChange={handleChange} value={insuranceForm.email} />
              </label>
              <label className="CostumerMultiStepsLabel">
                <div className="flex justify-start items-center">
                  <h4 className="w-fit pl-4 text-left text-xl">Cell Phone</h4>
                  <p className="text-sm w-fit ml-2 italic">(Where we will email your quote)</p>
                </div>
                <input name="phone" type="number" pattern="\d*" className="multistepsinput" onChange={handleChange} value={insuranceForm.phone} />
              </label>
              <button type="submit" className="flex justify-center items-center text-white bg-blue-900 rounded-xl py-2 px-8 my-auto">
                <p className="w-fit lg:text-xl">Continue</p>
                <p className="text-2xl w-fit ml-1 lg:text-3xl">&#8594;</p>
              </button>
            </form>
            <form onSubmit={handleFinalSubmit} className="multiStepsForm">
              <div className="CostumerMultiStepsLabel">
                <h4 className="w-fit pl-4 mb-2 text-xl">Radius of driving</h4>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <button type="button" name="radiusDriving" className={`py-2 rounded-2xl ${insuranceForm.radiusDriving === "0" ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="0">0 - 50 Miles</button>
                  <button type="button" name="radiusDriving" className={`py-2 rounded-2xl ${insuranceForm.radiusDriving === "51" ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="51">51 - 200 Miles</button>
                  <button type="button" name="radiusDriving" className={`py-2 rounded-2xl ${insuranceForm.radiusDriving === "201" ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="201">201 - 500 Miles</button>
                  <button type="button" name="radiusDriving" className={`py-2 rounded-2xl ${insuranceForm.radiusDriving === "501" ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="501">501+ Miles</button>
                </div>
              </div>
              <div className="CostumerMultiStepsLabel">
                <h4 className="w-fit pl-4 my-2 text-xl">Select your coverage(s)</h4>
                <div>
                  <button type="button" name="coverage" className={`text-left pl-10 py-2 mb-4 rounded-2xl ${coverage.al ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="al">Automotive Liability</button>
                  <button type="button" name="coverage" className={`text-left pl-10 py-2 mb-4 rounded-2xl ${coverage.ntl ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="ntl">Non-Trucking Liability</button>
                  <button type="button" name="coverage" className={`text-left pl-10 py-2 mb-4 rounded-2xl ${coverage.pd ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="pd">Physical Damage</button>
                  <button type="button" name="coverage" className={`text-left pl-10 py-2 mb-4 rounded-2xl ${coverage.mtc ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="mtc">Motor Truck Cargo</button>
                  <button type="button" name="coverage" className={`text-left pl-10 py-2 mb-4 rounded-2xl ${coverage.gl ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="gl">General Liability</button>
                </div>
              </div>
              <button type="submit" className="flex justify-center items-center text-white bg-blue-900 rounded-xl py-2 px-8 my-auto">
                <p className="w-fit lg:text-xl">Submit</p>
                <p className="text-2xl w-fit ml-1 lg:text-3xl">&#8594;</p>
              </button>
            </form>
          </Steps>
        </>
      }
      { loading && (
        <div className="loader">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

export default CostumerMultiStepsForm;
