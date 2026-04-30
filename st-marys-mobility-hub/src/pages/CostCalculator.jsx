import { useState, useEffect } from "react";

function CostCalculator() {
  const [distance, setDistance] = useState("");
  const [mode, setMode] = useState("bus");

  useEffect(() => {
    if (distance) {
      localStorage.setItem("lastDistance", distance);
    }
    localStorage.setItem("lastMode", mode);
  }, [distance, mode]);

  function calculateCost() {
    const miles = Number(distance);

    if (!distance || miles <= 0) {
      return "Enter a valid distance.";
    }

    if (mode === "walking") return "£0.00";
    if (mode === "cycling") return "£0.00";
    if (mode === "bus") return "£1.75";

    if (mode === "rail") {
      if (miles <= 3) return "£2.80 - £3.50";
      if (miles <= 8) return "£3.50 - £5.60";
      return "£5.60+";
    }
  }

  return (
    <div>
      <h2>Cost Calculator</h2>

      <p>Estimate journey cost based on distance and mode.</p>

      <div className="card">
        <div className="input-row">
          <label>Distance</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <div className="input-row">
          <label>Mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="bus">Bus</option>
            <option value="rail">Rail / Tube</option>
            <option value="cycling">Cycling</option>
            <option value="walking">Walking</option>
          </select>
        </div>
      </div>

      <div className="card">
        <h3>Estimated Cost</h3>
        <p>{calculateCost()}</p>
      </div>
    </div>
  );
}

export default CostCalculator;