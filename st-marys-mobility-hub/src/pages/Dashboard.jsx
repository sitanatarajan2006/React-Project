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

      <p>View favourite journeys and monitored service alerts.</p>

      <div className="card">
        <h3>Service Alerts</h3>

        {alertMessage && <p>{alertMessage}</p>}

        {alerts.length > 0 && (
          <div className="grid">
            {alerts.map((line) => (
              <div className="card" key={line.id}>
                <h3>{line.name}</h3>
                <p className="status-delay">
                  {line.lineStatuses[0]?.statusSeverityDescription}
                </p>
                <p>{line.lineStatuses[0]?.reason || "No details available"}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h3>Favourite Journeys</h3>

        {favourites.length === 0 && <p>No favourite journeys saved yet.</p>}

        {favourites.length > 0 && (
          <div className="grid">
            {favourites.map((journey) => (
              <div className="card" key={journey.id}>
                <h3>
                  {journey.start} to {journey.end}
                </h3>

                <p>
                  <strong>Typical time:</strong> {journey.duration} mins
                </p>

                <button onClick={() => setSelectedJourney(journey)}>
                  Details
                </button>

                <button
                  className="secondary"
                  onClick={() => removeFavourite(journey.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedJourney && (
        <div className="card">
          <h3>
            Journey Details: {selectedJourney.start} to {selectedJourney.end}
          </h3>

          <p>Total time: {selectedJourney.duration} minutes</p>

          <div className="grid">
            {selectedJourney.services.map((service, index) => (
              <div className="card" key={index}>
                <p>
                  <strong>Step {index + 1}:</strong> {service.mode}
                </p>
                <p>
                  <strong>Service:</strong> {service.service}
                </p>
                <p>
                  <strong>From:</strong> {service.from}
                </p>
                <p>
                  <strong>To:</strong> {service.to}
                </p>
                <p className="muted">{service.duration} mins</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;