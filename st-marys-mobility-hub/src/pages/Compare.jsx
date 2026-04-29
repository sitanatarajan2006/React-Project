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
        convenience: "Best for very short journeys",
        carbon: "0g CO₂e per person",
      },
      {
        mode: "Cycling",
        cost: "£0.00",
        time: `${Math.round(miles * 6)} mins`,
        convenience: "Fast and free if using your own bike, but weather dependent",
        carbon: "0g CO₂e per person",
      },
      {
        mode: "Bus",
        cost: "Approx. £1.75",
        time: `${Math.round(miles * 8 + 10)} mins`,
        convenience: "Good value, fixed fare, but traffic can affect journey time",
        carbon: `${Math.round(miles * 80)}g CO₂e per passenger`,
      },
      {
        mode: "Rail / Tube",
        cost:
          miles <= 3
            ? "£2.80 - £3.50"
            : miles <= 8
            ? "£3.50 - £5.60"
            : "£5.60 - £8.50+",
        time: `${Math.round(miles * 4 + 5)} mins`,
        convenience: "Usually fastest for medium and longer journeys",
        carbon: `${Math.round(miles * 35)}g CO₂e per passenger`,
      },
    ];
  }

  const results = getComparison();

  return (
    <div>
      <h2>Compare Travel Modes</h2>

      <p>
        Compare walking, cycling, bus and rail using estimated cost, journey time,
        convenience and carbon impact.
      </p>

      <p>
        Carbon figures are simplified per-person estimates. Public transport is
        calculated per passenger, not as if one user is responsible for the whole
        bus or train.
      </p>

      <label>Journey distance in miles:</label>
      <br />
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="Example: 5"
      />

      <br />
      <br />

      {results.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Mode</th>
              <th>Cost</th>
              <th>Time</th>
              <th>Convenience</th>
              <th>Carbon Impact</th>
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
      )}
    </div>
  );
}

export default Compare;