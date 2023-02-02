import { useState } from "react";
import { Steps, useSteps } from "react-step-builder";
import ComercialTruck from "../ComercialTruck/ComercialTruck";
import { sendDotAxios } from "../../api/axiosFunctions";
import { getInsuranceCostumerFormLocalStorage, saveInsuranceCostumerFormLocalStorage } from "../../api/insuranceLocalStorage";
import Circles from "./Circles";
import usStates from '../../data/us-states-with-quotes.json';
import './MultiStepsForm.css';

const CostumerMultiStepsForm = () => {
  const { next, jump, current, total } = useSteps();
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

  const updateWithDotNumber = async (dotNumber) => {
    if (dotChecked || dotNumber === 0) {
      jump(2);
      return;
    };
    const response = await sendDotAxios(dotNumber);
    if (response) {
      setInsuranceForm((prevState)=> {
        return({
          ...prevState,
          "garageState": response.garageState,
          "garageZip": response.garageZip,
          "drivers": response.drivers,
          "trucks": response.trucks,
          "companyName": response.legalName
        });
      });
      jump(2);
    } else {
      alert('Invalid DOT Number')
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setComercialForm(true);
    }, "3000")
    saveInsuranceCostumerFormLocalStorage(insuranceForm);
  };

  return (
    <div className="multiStepsFormPage">
      { comercialForm ?
        <ComercialTruck />
        :
        <>
          <h2>RAPID QUOTE</h2>
          <div className="circlesDiv">
            <Circles circleNumber={total} current={current} />
          </div>
          { current === 2 && 
            <h3>Please confirm the below information.</h3>
          }
          <form onSubmit={handleSubmit} className="multiStepsForm">
            <Steps>
              <div>
                <label className="CostumerMultiStepsLabel">
                  <h4 className="w-fit pl-4 text-xl">DOT Number</h4>
                  {!dotChecked && <input name="dotNumber" type="number" className="multistepsinput" id="dotNumberInput" onChange={handleChange} value={insuranceForm.dotNumber} />}
                  <div className="flex items-center pl-4">
                    <input type="checkbox" className="w-fit mr-4" checked={dotChecked} onChange={() =>setDotChecked(!dotChecked)} />I do not have a DOT number yet
                  </div>
                </label>
                <label className="CostumerMultiStepsLabel">
                  <h4 className="w-fit pl-4 text-xl">Years In Business</h4>
                  <input name="businessYears" type="number" className="multistepsinput" onChange={handleChange} value={insuranceForm.businessYears} />
                </label>
                <label className="CostumerMultiStepsLabel">
                  <h4 className="w-fit pl-4 text-left text-xl">When would you like your coverage to start?</h4>
                  <input name="coverageStartDate" type="date" className="multistepsinput" onChange={handleChange} value={insuranceForm.coverageStartDate} />
                </label>
              </div>
              <div>
                <label className="CostumerMultiStepsLabel">
                  <h4 className="w-fit pl-4 text-xl">Company Name</h4>
                  <input name="companyName" type="text" className="multistepsinput" onChange={handleChange} value={insuranceForm.companyName} />
                </label>
                <label className="CostumerMultiStepsLabel">
                  <h4 className="w-fit pl-4 text-xl">Garage State</h4>
                  <select name="garageState" id="garageState" className="multiStepsselect" onChange={handleChange} value={insuranceForm.garageState}>
                    <option value="selectState">Select State</option>
                    {usStates.map((state) => (
                      <option key={state.id} value={state.value_back}>{state.value}</option>
                    ))}
                  </select>
                </label>
                <label className="CostumerMultiStepsLabel">
                  <h4 className="w-fit pl-4 text-xl">Garage Zip Code</h4>
                  <input name="garageZip" type="text" className="multistepsinput" onChange={handleChange} value={insuranceForm.garageZip} />
                </label>
                <label className="CostumerMultiStepsLabel">
                  <h4 className="w-fit pl-4 text-xl">Number of Trucks</h4>
                  <input name="trucks" type="number" className="multistepsinput" onChange={handleChange} value={insuranceForm.trucks} />
                </label>
                <label className="CostumerMultiStepsLabel">
                  <h4 className="w-fit pl-4 text-xl">Number of Drivers</h4>
                  <input name="drivers" type="number" className="multistepsinput" onChange={handleChange} value={insuranceForm.drivers} />
                </label>
              </div>
              <div>
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
                  <input name="phone" type="text" className="multistepsinput" onChange={handleChange} value={insuranceForm.phone} />
                </label>
              </div>
              <div>
                <div className="CostumerMultiStepsLabel">
                  <h4 className="w-fit pl-4 mb-2 text-xl">Radius of driving</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" name="radiusDriving" className={`py-3 rounded-2xl ${insuranceForm.radiusDriving === "0" ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="0">0 - 50 Miles</button>
                    <button type="button" name="radiusDriving" className={`py-3 rounded-2xl ${insuranceForm.radiusDriving === "51" ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="51">51 - 200 Miles</button>
                    <button type="button" name="radiusDriving" className={`py-3 rounded-2xl ${insuranceForm.radiusDriving === "201" ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="201">201 - 500 Miles</button>
                    <button type="button" name="radiusDriving" className={`py-3 rounded-2xl ${insuranceForm.radiusDriving === "501" ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="501">501+ Miles</button>
                  </div>
                </div>
                <div className="CostumerMultiStepsLabel">
                  <h4 className="w-fit pl-4 mb-2 text-xl">Select your coverage(s)</h4>
                  <div>
                    <button type="button" name="coverage" className={`text-left pl-10 py-3 mb-4 rounded-2xl ${coverage.al ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="al">Automotive Liability</button>
                    <button type="button" name="coverage" className={`text-left pl-10 py-3 mb-4 rounded-2xl ${coverage.ntl ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="ntl">Non-Trucking Liability</button>
                    <button type="button" name="coverage" className={`text-left pl-10 py-3 mb-4 rounded-2xl ${coverage.pd ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="pd">Physical Damage</button>
                    <button type="button" name="coverage" className={`text-left pl-10 py-3 mb-4 rounded-2xl ${coverage.mtc ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="mtc">Motor Truck Cargo</button>
                    <button type="button" name="coverage" className={`text-left pl-10 py-3 mb-4 rounded-2xl ${coverage.gl ? "bg-red-700 text-white" : "bg-zinc-300"}`} onClick={handleChange} value="gl">General Liability</button>
                  </div>
                </div>
              </div>
            </Steps>
            <div className="multiStepsButtonDiv">
              {current < total && <button type="button" className="multiStepsButtonNext" onClick={current === 1 ? () => updateWithDotNumber(insuranceForm.dotNumber) : next}>NEXT</button>}
              {current === total && <button type="submit" className="multiStepsButtonNext">SUBMIT</button>}
            </div>
          </form>
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
