import { useState } from "react";

function Compare() {
  const [distance, setDistance] = useState("");

  return (
    <div>
      <h2>Compare Travel Modes</h2>

      <p>
        Compare walking, cycling, bus and rail using estimated cost, journey time,
        convenience and carbon impact.
      </p>

      <label>Journey distance in miles:</label>
      <br />
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="Example: 5"
      />
    </div>
  );
}

export default Compare;