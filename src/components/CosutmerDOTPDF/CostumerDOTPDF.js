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
    const companyName = pdfData.response.legalName;
    const underscoreCompanyName = companyName.replaceAll(' ','_');
    const formData = new FormData();
    formData.append("pdf", pdfUserBlob, `${underscoreCompanyName}`);
    const response = await postPDFAxios(formData);
    const mailLink = response.split('URL: ');
    setLink(mailLink[1].replace('s3.us-east-2.amazonaws', 'americanfleetinsurance'));
  }

  return (
    <>
      { loading && (
        <div className="loader">
          <div className="spinner" />
        </div>
      )}
      <div className="w-1/4 flex text-3xl mt-8">
        <Circles circleNumber={total} current={current} />
      </div>
      <form className="w-1/2 mt-10">
      <Steps>
        <div>
          <label className="CostumerMultiStepsLabel">
            <h4 className="w-fit pl-4 text-xl">DOT Number</h4>
            <input name="submissionNumber" type="number" className="multistepsinput" onChange={handleDOTNumber} value={DOTNumber} />
          </label>
          <label className="CostumerMultiStepsLabel">
            <h4 className="w-fit pl-4 text-xl">Policy Start Date</h4>
            <input name="policyStartDate" type="date" className="multistepsinput" onChange={handleDate} value={effectiveDate} />
          </label>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xl">File uploaded successfully. Click the button below to send an email.</p>
          <a
            className="bg-green-700 text-white w-3/4 rounded-xl py-4 px-10 mt-10 text-2xl"
            href={`mailto:?bcc=megan@teamafi.com&subject=Insurance%20Quote%20from%20American%20Fleet&body=Please%20see%20the%20quote%20from%20American%20Fleet.%0D%0A%0D%0AThe%20link%20below%20will%20open%20up%20the%20quote%20as%20a%20PDF%20so%20you%20can%20view%20and%20download.%0D%0A%0D%0A${link}%0D%0A%0D%0AFeel%20free%20to%20call%20me%20with%20any%20questions%20and%20or%20to%20get%20started.%0D%0A%0D%0AMegan%20DeGroot%0D%0A469-830-1658%0D%0AMegan%40TeamAFI.com%0D%0AAmericanFleetInsurance.com`}
          >
            EMAIL PDF
          </a>
        </div>
      </Steps>
      <div className="multiStepsButtonDiv">
        {current === 1 && <button type="button" className="bg-red-700 text-white w-1/2 rounded-3xl py-2 px-10 mt-12" onClick={getDotData}>GENERATE PDF</button>}
        {current === total && <button type="button" className="bg-red-700 text-white w-1/2 rounded-xl py-2 px-10 mt-12" onClick={prev}>RETURN</button>}
      </div>
      </form>
    </>
  );
};

export default CostumerDOTPDF;
