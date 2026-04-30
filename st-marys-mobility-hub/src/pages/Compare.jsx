import { useState } from "react";

function Compare() {
  const [distance, setDistance] = useState("");

  const miles = Number(distance);

  function getComparison() {
    if (!distance || miles <= 0) {
      return [];
    }

    return [
      {
        mode: "Walking",
        cost: "£0.00",
        time: `${Math.round(miles * 20)} mins`,
        convenience: "Best for short journeys",
        carbon: "0g CO₂e",
      },
      {
        mode: "Cycling",
        cost: "£0.00",
        time: `${Math.round(miles * 6)} mins`,
        convenience: "Fast but weather dependent",
        carbon: "0g CO₂e",
      },
      {
        mode: "Bus",
        cost: "£1.75",
        time: `${Math.round(miles * 8 + 10)} mins`,
        convenience: "Low cost but traffic affected",
        carbon: `${Math.round(miles * 80)}g CO₂e`,
      },
      {
        mode: "Rail / Tube",
        cost:
          miles <= 3
            ? "£2.80 - £3.50"
            : miles <= 8
            ? "£3.50 - £5.60"
            : "£5.60+",
        time: `${Math.round(miles * 4 + 5)} mins`,
        convenience: "Fast and reliable",
        carbon: `${Math.round(miles * 35)}g CO₂e`,
      },
    ];
  }

  const results = getComparison();

  return (
    <div>
      <h2>Compare Travel Modes</h2>

      <p>Compare time, cost and environmental impact.</p>

      <div className="card">
        <div className="input-row">
          <label>Distance (miles)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="e.g. 5"
          />
        </div>
      </div>

      {results.length > 0 && (
        <div className="grid">
          {results.map((item) => (
            <div className="card" key={item.mode}>
              <h3>{item.mode}</h3>
              <p><strong>Cost:</strong> {item.cost}</p>
              <p><strong>Time:</strong> {item.time}</p>
              <p><strong>Convenience:</strong> {item.convenience}</p>
              <p className="muted">{item.carbon}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Compare;