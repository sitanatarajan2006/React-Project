import { useState } from "react";

function NearbyStops() {
  const [query, setQuery] = useState("");
  const [stops, setStops] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [selectedStop, setSelectedStop] = useState("");
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");

  async function searchStops() {
    if (!query.trim()) {
      setMessage("Enter a postcode, station name, or stop name.");
      setStops([]);
      setArrivals([]);
      return;
    }

    setMessage("Searching...");
    setStops([]);
    setArrivals([]);
    setSelectedStop("");

    try {
      const response = await fetch(
        `https://api.tfl.gov.uk/StopPoint/Search/${encodeURIComponent(
          query
        )}?modes=bus,tube,overground,elizabeth-line,national-rail&maxResults=10&includeHubs=true`
      );

      const data = await response.json();

      if (!response.ok || !data.matches || data.matches.length === 0) {
        setMessage(
          "No stops found. Try a station or stop name, such as Waterloo, Richmond, or Twickenham."
        );
        return;
      }

      setStops(data.matches.slice(0, 10));
      setMessage("");
    } catch {
      setMessage("Error loading stop data.");
      setStops([]);
      setArrivals([]);
    }
  }

  async function fetchArrivals(stop) {
    setSelectedStop(stop.name);
    setArrivalMessage("Loading arrivals...");
    setArrivals([]);

    try {
      const response = await fetch(
        `https://api.tfl.gov.uk/StopPoint/${stop.id}/Arrivals`
      );

      const data = await response.json();

      if (!response.ok || !Array.isArray(data) || data.length === 0) {
        setArrivalMessage("No live arrivals available for this stop.");
        return;
      }

      const sortedArrivals = data
        .sort((a, b) => a.timeToStation - b.timeToStation)
        .slice(0, 8);

      setArrivals(sortedArrivals);
      setArrivalMessage("");
    } catch {
      setArrivalMessage("Error loading arrivals.");
      setArrivals([]);
    }
  }

  return (
    <div>
      <h2>Nearby Stops</h2>

      <p>
        Search for transport stops using a postcode, station name, or stop name,
        then view live arrivals where available.
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Example: Waterloo, Richmond, Twickenham"
      />

      <br />
      <br />

      <button onClick={searchStops}>Search Stops</button>

      {message && <p>{message}</p>}

      {stops.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Modes</th>
              <th>Arrivals</th>
            </tr>
          </thead>
          <tbody>
            {stops.map((stop) => (
              <tr key={stop.id}>
                <td>{stop.name}</td>
                <td>{stop.modes ? stop.modes.join(", ") : "Not listed"}</td>
                <td>
                  <button onClick={() => fetchArrivals(stop)}>
                    View arrivals
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedStop && <h3>Live arrivals for {selectedStop}</h3>}

      {arrivalMessage && <p>{arrivalMessage}</p>}

      {arrivals.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Destination</th>
              <th>Arrival</th>
            </tr>
          </thead>
          <tbody>
            {arrivals.map((arrival) => (
              <tr key={arrival.id}>
                <td>{arrival.lineName}</td>
                <td>{arrival.destinationName}</td>
                <td>{Math.ceil(arrival.timeToStation / 60)} mins</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NearbyStops;