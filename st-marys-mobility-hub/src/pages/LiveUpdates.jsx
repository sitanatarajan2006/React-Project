import { useEffect, useState } from "react";

function LiveUpdates() {
  const [lines, setLines] = useState([]);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://api.tfl.gov.uk/line/mode/tube,overground/status"
        );

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          setMessage("No data available.");
          return;
        }

        setLines(data);
        setMessage("");
      } catch {
        setMessage("Error loading data.");
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Live Service Updates</h2>

      <p>Live status of major London transport lines.</p>

      {message && <p>{message}</p>}

      {lines.length > 0 && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Line</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line) => (
                <tr key={line.id}>
                  <td>{line.name}</td>
                  <td>{line.lineStatuses[0]?.statusSeverityDescription}</td>
                  <td>{line.lineStatuses[0]?.reason || "Good service"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LiveUpdates;