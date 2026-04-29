import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import JourneyPlanner from "./pages/JourneyPlanner"
import Compare from "./pages/Compare"
import CostCalculator from "./pages/CostCalculator"
import Dashboard from "./pages/Dashboard"
import TravelModes from "./pages/TravelModes";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/journey-planner">Journey Planner</Link> |{" "}
        <Link to="/compare">Compare Travel Modes</Link> |{" "}
        <Link to="/cost-calculator">Cost Calculator</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/travel-modes">Travel Modes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey-planner" element={<JourneyPlanner />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/cost-calculator" element={<CostCalculator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/travel-modes" element={<TravelModes />} />
      </Routes>
    </Router>
  );
}

export default App