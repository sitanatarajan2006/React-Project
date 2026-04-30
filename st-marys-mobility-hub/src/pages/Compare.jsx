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
        carbon: "0g CO₂e per person",
      },
      {
        mode: "Cycling",
        cost: "£0.00",
        time: `${Math.round(miles * 6)} mins`,
        convenience: "Fast but weather dependent",
        carbon: "0g CO₂e per person",
      },
      {
        mode: "Bus",
        cost: "£1.75",
        time: `${Math.round(miles * 8 + 10)} mins`,
        convenience: "Low cost but affected by traffic",
        carbon: `${Math.round(miles * 80)}g CO₂e per passenger`,
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
        carbon: `${Math.round(miles * 35)}g CO₂e per passenger`,
      },
    ];
  }

  const results = getComparison();

  return (
    <div>
      <h2>Compare Travel Modes</h2>

      <p>Compare cost, time, convenience and environmental impact.</p>

      <div className="card">
        <label>Journey distance in miles</label>
        <br />
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Example: 5"
        />
      </div>

      {results.length > 0 && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Mode</th>
                <th>Cost</th>
                <th>Time</th>
                <th>Convenience</th>
                <th>Carbon</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr key={item.mode}>
                  <td>{item.mode}</td>
                  <td>{item.cost}</td>
                  <td>{item.time}</td>
                  <td>{item.convenience}</td>
                  <td>{item.carbon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Compare;