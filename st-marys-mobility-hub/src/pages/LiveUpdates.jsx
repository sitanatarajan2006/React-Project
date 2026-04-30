import { useEffect, useState } from "react";

function LiveUpdates() {
  const [lines, setLines] = useState([]);
  const [watchedLines, setWatchedLines] = useState([]);
  const [message, setMessage] = useState("Loading live service updates...");

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
          setMessage("No live service updates available.");
          return;
        }

        setLines(data);
        setMessage("");
      } catch {
        setMessage("Error loading live service updates.");
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

  function getStatusClass(status) {
    if (status === "Good Service") {
      return "status-good";
    }

    if (status?.toLowerCase().includes("minor")) {
      return "status-warning";
    }

    return "status-delay";
  }

  return (
    <div>
      <h2>Live Service Updates</h2>

      <p>
        View live transport status updates and choose service lines to monitor on
        your dashboard.
      </p>

      {message && <p>{message}</p>}

      {lines.length > 0 && (
        <div className="grid">
          {lines.map((line) => {
            const status =
              line.lineStatuses[0]?.statusSeverityDescription || "Unknown";
            const details = line.lineStatuses[0]?.reason || "No disruption reported";

            return (
              <div className="card" key={line.id}>
                <h3>{line.name}</h3>

                <p className={getStatusClass(status)}>{status}</p>

                <p>{details}</p>

                <button
                  className={isWatched(line.id) ? "secondary" : ""}
                  onClick={() => toggleWatch(line)}
                >
                  {isWatched(line.id) ? "Remove monitor" : "Monitor line"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LiveUpdates;