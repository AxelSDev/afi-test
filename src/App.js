import { Route, Routes } from 'react-router-dom';
import CostumerPage from './pages/CostumerPage';
import FinalizeQuote from './pages/FinalizeQuote';

function App() {
  return (
    <div className="App flex flex-col items-center">
      <Routes>
        <Route path="/" element={<CostumerPage />} />
        <Route path="/finalize" element={<FinalizeQuote />} />
      </Routes>
    </div>
  );
}

export default App;
