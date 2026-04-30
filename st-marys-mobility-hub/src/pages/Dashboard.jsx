import { useEffect, useState } from "react";

function Dashboard() {
  const [favourites, setFavourites] = useState([]);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("favouriteJourneys");

    if (saved) {
      setFavourites(JSON.parse(saved));
    }

    fetchWatchedLineAlerts();
  }, []);

  async function fetchWatchedLineAlerts() {
    const watched = localStorage.getItem("watchedLines");

    if (!watched) {
      setAlertMessage("No monitored service lines yet.");
      return;
    }

    const watchedLines = JSON.parse(watched);

    if (watchedLines.length === 0) {
      setAlertMessage("No monitored service lines yet.");
      return;
    }

    try {
      const res = await fetch(
        "https://api.tfl.gov.uk/line/mode/tube,overground,elizabeth-line,national-rail/status"
      );

      const data = await res.json();

      const delayed = data.filter((line) => {
        const watchedLine = watchedLines.some((item) => item.id === line.id);
        const status = line.lineStatuses[0]?.statusSeverityDescription;

        return watchedLine && status !== "Good Service";
      });

      setAlerts(delayed);

      if (delayed.length === 0) {
        setAlertMessage("No delays on your monitored lines.");
      } else {
        setAlertMessage("");
      }
    } catch {
      setAlertMessage("Unable to load monitored service alerts.");
    }
  }

  function removeFavourite(id) {
    const updated = favourites.filter((journey) => journey.id !== id);

    setFavourites(updated);
    localStorage.setItem("favouriteJourneys", JSON.stringify(updated));

    if (selectedJourney && selectedJourney.id === id) {
      setSelectedJourney(null);
    }
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <p>View your saved favourite journeys and monitored service alerts.</p>

      <div className="card">
        <h3>Service Alerts</h3>

        {alertMessage && <p>{alertMessage}</p>}

        {alerts.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Line</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((line) => (
                <tr key={line.id}>
                  <td>{line.name}</td>
                  <td>{line.lineStatuses[0]?.statusSeverityDescription}</td>
                  <td>{line.lineStatuses[0]?.reason || "No details"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h3>Favourite Journeys</h3>

        {favourites.length === 0 && <p>No favourite journeys saved yet.</p>}

        {favourites.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Typical Time</th>
                <th>Details</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {favourites.map((journey) => (
                <tr key={journey.id}>
                  <td>{journey.start}</td>
                  <td>{journey.end}</td>
                  <td>{journey.duration} mins</td>
                  <td>
                    <button onClick={() => setSelectedJourney(journey)}>
                      Details
                    </button>
                  </td>
                  <td>
                    <button onClick={() => removeFavourite(journey.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedJourney && (
        <div className="card">
          <h3>
            Journey Details: {selectedJourney.start} to {selectedJourney.end}
          </h3>

          <p>Total time: {selectedJourney.duration} minutes</p>

          <table>
            <thead>
              <tr>
                <th>Step</th>
                <th>Mode</th>
                <th>Service / Line</th>
                <th>From</th>
                <th>To</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {selectedJourney.services.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service.mode}</td>
                  <td>{service.service}</td>
                  <td>{service.from}</td>
                  <td>{service.to}</td>
                  <td>{service.duration} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;