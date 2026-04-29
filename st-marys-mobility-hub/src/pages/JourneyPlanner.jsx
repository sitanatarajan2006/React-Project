import { useState } from "react";

function JourneyPlanner() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

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
    </div>
  );
}

export default JourneyPlanner;