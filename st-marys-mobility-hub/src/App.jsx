import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import JourneyPlanner from "./pages/JourneyPlanner";
import Compare from "./pages/Compare";
import CostCalculator from "./pages/CostCalculator";
import Dashboard from "./pages/Dashboard";
import TravelModes from "./pages/TravelModes";

import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/travel-modes">Travel Modes</Link> |{" "}
        <Link to="/journey-planner">Journey Planner</Link> |{" "}
        <Link to="/compare">Compare Travel Modes</Link> |{" "}
        <Link to="/cost-calculator">Cost Calculator</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel-modes" element={<TravelModes />} />
          <Route path="/journey-planner" element={<JourneyPlanner />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/cost-calculator" element={<CostCalculator />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;