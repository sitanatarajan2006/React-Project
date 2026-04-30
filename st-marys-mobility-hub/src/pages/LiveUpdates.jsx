import { useEffect, useState } from "react";

function LiveUpdates() {
  const [lines, setLines] = useState([]);
  const [watchedLines, setWatchedLines] = useState([]);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const saved = localStorage.getItem("watchedLines");

    if (saved) {
      setWatchedLines(JSON.parse(saved));
    }

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

  function toggleWatch(line) {
    const exists = watchedLines.some((item) => item.id === line.id);

    let updated;

    if (exists) {
      updated = watchedLines.filter((item) => item.id !== line.id);
    } else {
      updated = [...watchedLines, { id: line.id, name: line.name }];
    }

    setWatchedLines(updated);
    localStorage.setItem("watchedLines", JSON.stringify(updated));
  }

  function isWatched(lineId) {
    return watchedLines.some((item) => item.id === lineId);
  }

  return (
    <div>
      <h2>Live Service Updates</h2>

      <p>
        View live service information and select lines to monitor on your
        dashboard.
      </p>

      {message && <p>{message}</p>}

      {lines.length > 0 && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Line</th>
                <th>Status</th>
                <th>Details</th>
                <th>Monitor</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line) => (
                <tr key={line.id}>
                  <td>{line.name}</td>
                  <td>{line.lineStatuses[0]?.statusSeverityDescription}</td>
                  <td>{line.lineStatuses[0]?.reason || "Good service"}</td>
                  <td>
                    <button onClick={() => toggleWatch(line)}>
                      {isWatched(line.id) ? "Remove" : "Monitor"}
                    </button>
                  </td>
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