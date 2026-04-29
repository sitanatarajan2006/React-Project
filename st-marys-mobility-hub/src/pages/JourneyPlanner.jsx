import { useState } from "react";

function JourneyPlanner() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const routes = [
    {
      from: "St Marys",
      to: "Richmond",
      options: [
        {
          mode: "Bus",
          time: "25 mins",
          cost: "£1.75",
          notes: "Direct route via local bus",
        },
        {
          mode: "Cycling",
          time: "20 mins",
          cost: "£0.00",
          notes: "Fast and flexible",
        },
        {
          mode: "Walking",
          time: "50 mins",
          cost: "£0.00",
          notes: "Long but simple route",
        },
      ],
    },
    {
      from: "Twickenham",
      to: "Waterloo",
      options: [
        {
          mode: "Rail",
          time: "35 mins",
          cost: "£5.50",
          notes: "Direct train service",
        },
        {
          mode: "Bus + Rail",
          time: "50 mins",
          cost: "£4.50",
          notes: "Cheaper but slower option",
        },
      ],
    },
    {
      from: "Richmond",
      to: "Kingston",
      options: [
        {
          mode: "Bus",
          time: "30 mins",
          cost: "£1.75",
          notes: "Direct route",
        },
        {
          mode: "Cycling",
          time: "25 mins",
          cost: "£0.00",
          notes: "Riverside route",
        },
      ],
    },
  ];

  const selectedRoute = routes.find(
    (route) => route.from === start && route.to === end
  );

  return (
    <div>
      <h2>Journey Planner</h2>

      <p>
        Select a start and destination to view available journey options using
        predefined local data.
      </p>

      <label>Start location:</label>
      <br />
      <select value={start} onChange={(e) => setStart(e.target.value)}>
        <option value="">Select start</option>
        <option value="St Marys">St Mary’s Campus</option>
        <option value="Twickenham">Twickenham Station</option>
        <option value="Richmond">Richmond Station</option>
      </select>

      <br />
      <br />

      <label>Destination:</label>
      <br />
      <select value={end} onChange={(e) => setEnd(e.target.value)}>
        <option value="">Select destination</option>
        <option value="Richmond">Richmond Station</option>
        <option value="Kingston">Kingston Town Centre</option>
        <option value="Waterloo">Waterloo</option>
      </select>

      <br />
      <br />

      {selectedRoute ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Mode</th>
              <th>Time</th>
              <th>Cost</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {selectedRoute.options.map((option, index) => (
              <tr key={index}>
                <td>{option.mode}</td>
                <td>{option.time}</td>
                <td>{option.cost}</td>
                <td>{option.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        start &&
        end && <p>No available routes for this journey.</p>
      )}
    </div>
  );
}

export default JourneyPlanner;