import { useEffect, useState } from "react";

function Dashboard() {
  const [distance, setDistance] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    const savedDistance = localStorage.getItem("lastDistance");
    const savedMode = localStorage.getItem("lastMode");

    if (savedDistance) setDistance(savedDistance);
    if (savedMode) setMode(savedMode);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {distance && mode ? (
        <div>
          <p>
            <strong>Last Journey Distance:</strong> {distance} miles
          </p>
          <p>
            <strong>Preferred Mode:</strong> {mode}
          </p>
        </div>
      ) : (
        <p>No saved data yet. Use the cost calculator first.</p>
      )}
    </div>
  );
}

export default Dashboard;