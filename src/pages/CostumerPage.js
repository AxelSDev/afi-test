import { StepsProvider } from "react-step-builder";
import CostumerMultiStepsForm from "../components/CostumerMultiStepsForm/CostumerMultiStepsForm";

const CostumerPage = () => (
  <StepsProvider>
    <CostumerMultiStepsForm />
  </StepsProvider>
);

export default CostumerPage;
