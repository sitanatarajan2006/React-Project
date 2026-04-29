import { useState } from "react";

function JourneyPlanner() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const routes = [
  {
    from: "St Marys",
    to: "Richmond",
    options: [
      { mode: "Bus", time: "25 mins", cost: "£1.75", notes: "Direct route" },
      { mode: "Cycling", time: "20 mins", cost: "£0.00", notes: "Fast and flexible" },
      { mode: "Walking", time: "50 mins", cost: "£0.00", notes: "Scenic route" },
    ],
  },
  {
    from: "Twickenham",
    to: "Waterloo",
    options: [
      { mode: "Rail", time: "35 mins", cost: "£5.50", notes: "Direct train" },
      { mode: "Bus + Rail", time: "50 mins", cost: "£4.50", notes: "Cheaper option" },
    ],
  },
];
const selectedRoute = routes.find(
  (route) => route.from === start && route.to === end
);

  return (
    <div>
      <h2>Journey Planner</h2>

      <label>Start location:</label>
      <br />
      <select value={start} onChange={(e) => setStart(e.target.value)}>
        <option value="">Select start</option>
        <option value="St Marys">St Mary’s Campus</option>
        <option value="Twickenham">Twickenham Station</option>
        <option value="Richmond">Richmond Station</option>
      </select>

      <br /><br />

      <label>Destination:</label>
      <br />
      <select value={end} onChange={(e) => setEnd(e.target.value)}>
        <option value="">Select destination</option>
        <option value="Richmond">Richmond Station</option>
        <option value="Kingston">Kingston Town Centre</option>
        <option value="Waterloo">Waterloo</option>
      </select>

      {selectedRoute && (
        <div>
          <h3>Route Options:</h3>
          <ul>
            {selectedRoute.options.map((option, index) => (
              <li key={index}>
                {option.mode} - {option.time} - {option.cost} ({option.notes})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default JourneyPlanner;