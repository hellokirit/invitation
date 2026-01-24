import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DatePlannerPage from './components/DatePlanner';
import CountdownPage from './components/CountdownPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/planner" element={<DatePlannerPage />} />
        <Route path="/countdown" element={<CountdownPage />} />
      </Routes>
    </Router>
  );
}

export default App;
