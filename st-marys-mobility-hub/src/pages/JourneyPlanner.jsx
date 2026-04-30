import { useState } from "react";

function JourneyPlanner() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [journeys, setJourneys] = useState([]);
  const [message, setMessage] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  async function getPlaceId(query) {
    const res = await fetch(
      `https://api.tfl.gov.uk/StopPoint/Search/${encodeURIComponent(query)}`
    );

    const data = await res.json();

    if (!data.matches || data.matches.length === 0) {
      return null;
    }

    return data.matches[0].id;
  }

  async function planJourney() {
    if (!start || !end) {
      setMessage("Enter both start and destination.");
      setJourneys([]);
      return;
    }

    setMessage("Searching...");
    setSavedMessage("");
    setJourneys([]);

    try {
      const fromId = await getPlaceId(start);
      const toId = await getPlaceId(end);

      if (!fromId || !toId) {
        setMessage("Invalid start or destination.");
        return;
      }

      const response = await fetch(
        `https://api.tfl.gov.uk/Journey/JourneyResults/${fromId}/to/${toId}`
      );

      const data = await response.json();

      if (!data.journeys || data.journeys.length === 0) {
        setMessage("No journeys found.");
        return;
      }

      setJourneys(data.journeys.slice(0, 3));
      setMessage("");
    } catch {
      setMessage("Error loading journeys.");
      setJourneys([]);
    }
  }

  function getServiceName(leg) {
    if (leg.routeOptions && leg.routeOptions.length > 0) {
      return leg.routeOptions[0].name;
    }

    if (leg.instruction && leg.instruction.summary) {
      return leg.instruction.summary;
    }

    return leg.mode.name;
  }

  function saveFavourite(journey) {
    const saved = JSON.parse(localStorage.getItem("favouriteJourneys") || "[]");

    const favourite = {
      id: Date.now(),
      start,
      end,
      duration: journey.duration,
      services: journey.legs.map((leg) => ({
        mode: leg.mode.name,
        service: getServiceName(leg),
        from: leg.departurePoint.commonName,
        to: leg.arrivalPoint.commonName,
        duration: leg.duration,
      })),
    };

    localStorage.setItem(
      "favouriteJourneys",
      JSON.stringify([...saved, favourite])
    );

    setSavedMessage("Journey saved to dashboard.");
  }

  return (
    <div>
      <h2>Journey Planner</h2>

      <p>Enter a start and destination to find routes using live TfL journey data.</p>

      <div className="card">
        <label>Start</label>
        <br />
        <input
          type="text"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="e.g. Twickenham Station"
        />

        <br />
        <br />

        <label>Destination</label>
        <br />
        <input
          type="text"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="e.g. Waterloo Station"
        />

        <br />
        <br />

        <button onClick={planJourney}>Plan Journey</button>
      </div>

      {message && <p>{message}</p>}
      {savedMessage && <p>{savedMessage}</p>}

      {journeys.length > 0 && (
        <div>
          {journeys.map((journey, index) => (
            <div className="card" key={index}>
              <h3>Option {index + 1}</h3>
              <p>Total time: {journey.duration} minutes</p>

              <button onClick={() => saveFavourite(journey)}>
                Save to favourites
              </button>

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
                  {journey.legs.map((leg, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{leg.mode.name}</td>
                      <td>{getServiceName(leg)}</td>
                      <td>{leg.departurePoint.commonName}</td>
                      <td>{leg.arrivalPoint.commonName}</td>
                      <td>{leg.duration} mins</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JourneyPlanner;