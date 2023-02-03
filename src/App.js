import { Route, Routes } from 'react-router-dom';
import CostumerPage from './pages/CostumerPage';
import DOTDatePDF from './pages/DOTDatePDF';
import DotPDF from './pages/DotPDF';
import FinalizeQuote from './pages/FinalizeQuote';

function App() {
  return (
    <div className="App flex flex-col items-center">
      <Routes>
        <Route path="/" element={<CostumerPage />} />
        <Route path="/finalize" element={<FinalizeQuote />} />
        <Route path="/cff" element={<DOTDatePDF />} />
        <Route path="/createpdfdot" element={<DotPDF />} />
      </Routes>
    </div>
  );
}

export default App;
