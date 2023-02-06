import { StepsProvider } from "react-step-builder";
import CostumerDOTPDF from "../components/CosutmerDOTPDF/CostumerDOTPDF";
import logo from '../images/AFI-FullColor.png'

const DOTDatePDF = () => (
  <StepsProvider>
    <img src={logo} alt='logo' className="w-1/3" />
    <CostumerDOTPDF />
  </StepsProvider>
);

export default DOTDatePDF;
