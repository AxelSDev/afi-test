import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendDotAxios } from "../api/axiosFunctions";
import producers from '../data/AFI-ContactInfo-Producers.json';

const DOTDatePDF = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  const navigate = useNavigate();
  const [DOTNumber, setDOTNumber] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(today);
  const producer = producers.filter((producer) => producer.AgentName === "Megan DeGroot")[0];

  const handleDOTNumber = (event) => {
    let newValue = event.target.value;
    setDOTNumber(newValue);
  };

  const handleDate = (event) => {
    let newValue = event.target.value;
    setEffectiveDate(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!['0', ''].includes(DOTNumber)) {
      const response = await sendDotAxios(DOTNumber);
      if (response.status === 404) {
        alert('submission not found');
      } else {
        navigate('/createpdfdot', {state: {response, effectiveDate, producer, DOTNumber}});
      };
    };
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 mt-10">
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit pl-4 text-xl">DOT Number</h4>
        <input name="submissionNumber" type="number" className="multistepsinput" onChange={handleDOTNumber} value={DOTNumber} />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit pl-4 text-xl">Producer</h4>
        <select name="producer" className="multiStepsselect" value={producer.AgentName} disabled>
          <option value="producer">Select Producer</option>
          {producers.map((producer) => (
            <option key={producer.id} value={producer.AgentName}>{producer.AgentName}</option>
          ))}
        </select>
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit pl-4 text-xl">Policy Start Date</h4>
        <input name="policyStartDate" type="date" className="multistepsinput" onChange={handleDate} value={effectiveDate} />
      </label>
      <div className="flex justify-center">
        <button type="submit" className="bg-red-700 text-white w-1/2 rounded-3xl py-2 px-10 mt-12">GENERATE PDF</button>
      </div>
    </form>
  );
};

export default DOTDatePDF;
