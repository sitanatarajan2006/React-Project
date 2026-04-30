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
      return "Please enter a valid journey distance.";
    }

    if (mode === "walking") {
      return "Estimated cost: £0.00 - walking is free.";
    }

    if (mode === "cycling") {
      return "Estimated cost: £0.00 - cycling is free if using your own bike.";
    }

    if (mode === "bus") {
      return "Estimated cost: around £1.75 - London buses use a fixed fare.";
    }

    if (mode === "rail") {
      if (miles <= 3) {
        return "Estimated cost: £2.80 - £3.50 for a short journey.";
      } else if (miles <= 8) {
        return "Estimated cost: £3.50 - £5.60 for a medium journey.";
      } else {
        return "Estimated cost: £5.60 - £8.50+ for a longer journey.";
      }
    }
  }

  return (
    <div>
      <h2>Cost Calculator</h2>

      <p>
        Estimate journey cost based on travel mode and distance. This is a simplified guide.
      </p>

      <div className="card">
        <label>Distance in miles</label>
        <br />
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Example: 5"
        />

        <br /><br />

        <label>Travel mode</label>
        <br />
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="bus">Bus</option>
          <option value="rail">Rail / Tube</option>
          <option value="cycling">Cycling</option>
          <option value="walking">Walking</option>
        </select>
      </div>

      <div className="card">
        <h3>{calculateCost()}</h3>
      </div>
    </div>
  );
}

export default CostCalculator;