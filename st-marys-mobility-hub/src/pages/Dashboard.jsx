import { useEffect, useState } from "react";

function Dashboard() {
  const [distance, setDistance] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    const savedDistance = localStorage.getItem("lastDistance");
    const savedMode = localStorage.getItem("lastMode");

    if (savedDistance) {
      setDistance(savedDistance);
    }

    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Overview of your recent journey preferences.</p>

      <div className="card">
        <h3>Recent Journey</h3>

        {distance && mode ? (
          <>
            <p>
              <strong>Distance:</strong> {distance} miles
            </p>
            <p>
              <strong>Preferred mode:</strong> {mode}
            </p>
          </>
        ) : (
          <p>No saved journey data yet. Use the cost calculator first.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;