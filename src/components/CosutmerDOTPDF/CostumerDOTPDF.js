import { useState } from "react";
import { pdf } from '@react-pdf/renderer';
import { Steps, useSteps } from "react-step-builder";
import { sendDotAxios, postPDFAxios } from "../../api/axiosFunctions";
import CompanyPDF2 from "../CompanyPDF/CompanyPDF2";
import producers from '../../data/AFI-ContactInfo-Producers.json';
import Circles from "../CostumerMultiStepsForm/Circles";

const CostumerDOTPDF = () => {
  const { jump, prev, current, total } = useSteps();
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  const [DOTNumber, setDOTNumber] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(today);
  const [link, setLink] = useState('false');
  const [loading, setLoading] = useState(false);
  const producer = producers.filter((producer) => producer.AgentName === "Megan DeGroot")[0];

  const handleDOTNumber = (event) => {
    let newValue = event.target.value;
    setDOTNumber(newValue);
  };

  const handleDate = (event) => {
    let newValue = event.target.value;
    setEffectiveDate(newValue);
  };

  const getDotData = async () => {
    if (['0', ''].includes(DOTNumber)) {
      return;
    }
    const response = await sendDotAxios(DOTNumber);
    if (response.status === 404) {
      alert('submission not found');
    } else {
      setLoading(true);
      await handleMailPDF({response, effectiveDate, producer, DOTNumber});
      setLoading(false);
      jump(2);
    };
  };
  
  const handleMailPDF = async (pdfData) => {
    const pdfUserBlob = await pdf(<CompanyPDF2 pdfData={pdfData} />).toBlob();
    const formData = new FormData();
    formData.append("pdf", pdfUserBlob, `${pdfData.response.legalName}`);
    const response = await postPDFAxios(formData);
    const maillink = response.split('URL: ');
    setLink(maillink[1]);
  }

  return (
    <>
      { loading && (
        <div className="loader">
          <div className="spinner" />
        </div>
      )}
      <div className="w-1/4 flex text-3xl mt-24">
        <Circles circleNumber={total} current={current} />
      </div>
      <form className="w-1/2 mt-10">
      <Steps>
        <div>
          <label className="CostumerMultiStepsLabel">
            <h4 className="w-fit pl-4 text-xl">DOT Number</h4>
            <input name="submissionNumber" type="number" className="multistepsinput" onChange={handleDOTNumber} value={DOTNumber} />
          </label>
          {/* <label className="CostumerMultiStepsLabel">
            <h4 className="w-fit pl-4 text-xl">Producer</h4>
            <select name="producer" className="multiStepsselect" value={producer.AgentName} disabled>
              <option value="producer">Select Producer</option>
              {producers.map((producer) => (
                <option key={producer.id} value={producer.AgentName}>{producer.AgentName}</option>
              ))}
            </select>
          </label> */}
          <label className="CostumerMultiStepsLabel">
            <h4 className="w-fit pl-4 text-xl">Policy Start Date</h4>
            <input name="policyStartDate" type="date" className="multistepsinput" onChange={handleDate} value={effectiveDate} />
          </label>
        </div>
        <div>
          <p>File uploaded successfully.
            {' '}
            <a href={link} className='text-blue-500 underline'>
              link
            </a>
          </p>
        </div>
      </Steps>
        <div className="multiStepsButtonDiv">
          {current === 1 && <button type="button" className="bg-red-700 text-white w-1/2 rounded-3xl py-2 px-10 mt-12" onClick={getDotData}>GENERATE PDF</button>}
          {current === total && <button type="button" className="bg-red-700 text-white w-1/2 rounded-3xl py-2 px-10 mt-12" onClick={prev}>RETURN</button>}
        </div>
      </form>
    </>
  );
};

export default CostumerDOTPDF;
