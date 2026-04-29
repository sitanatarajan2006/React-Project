import { useState } from "react";

function JourneyPlanner() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div>
      <h2>Journey Planner</h2>
      <p>Select a start and destination to view available routes.</p>

      <label>Start location:</label>
      <br />
      <input
        type="text"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        placeholder="e.g. Station A"
      />

      <br /><br />

      <label>Destination:</label>
      <br />
      <input
        type="text"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        placeholder="e.g. Station B"
      />
    </div>
  );
}

export default JourneyPlanner;