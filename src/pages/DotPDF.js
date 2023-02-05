import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pdf, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import CompanyPDF2 from '../components/CompanyPDF/CompanyPDF2';
import { IconContext } from "react-icons";
import { HiDownload } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { postPDFAxios } from '../api/axiosFunctions';

const DotPDF = () => {
  const location = useLocation();
  const [link, setLink] = useState('false');
  const submissionData = location.state;
  const companyName = submissionData.response.legalName || 'No company Name';
  
  const handleMailPDF = async () => {
    const pdfUserBlob = await pdf(<CompanyPDF2 pdfData={submissionData} />).toBlob();
    const formData = new FormData();
    formData.append("pdf", pdfUserBlob, `${companyName}`);
    const response = await postPDFAxios(formData);
    const link = response.split('URL: ');
    setLink(link[1]);
    alert(response);
  }

  return (
    <div style={{position:"relative"}}>
      <div className="loader">
        <h1>GENERATING PDF . . .</h1>
        <div className="spinner" />
      </div>
      <PDFViewer style={{width:"100%", height:"100vh", position:"absolute", left:"0", top:"0", marginTop: "-20px", zIndex: "101"}}>
        <CompanyPDF2 pdfData={submissionData} />
      </PDFViewer>
      <button type='button' onClick={handleMailPDF} className="p-2 hidden xl:block fixed w-fit mr-36 mt-2 right-0 top-0 z-[102] text-white bg-[rgb(50,54,57)]">
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <FiMail />
        </IconContext.Provider>
      </button>
      <PDFDownloadLink
        className="hidden xl:block fixed w-fit mr-24 mt-2 right-0 top-0 z-[102] text-white bg-[rgb(50,54,57)]"
        document={<CompanyPDF2 pdfData={submissionData} />}
        fileName={`${companyName}.pdf`}
      >
        {({ loading }) => (loading ? '' :
          <div className="p-2">
            <IconContext.Provider value={{ size: "1.5rem" }}>
              <HiDownload />
            </IconContext.Provider>
          </div>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default DotPDF;
