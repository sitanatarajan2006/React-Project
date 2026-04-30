import { useState } from "react";

function NearbyStops() {
  const [query, setQuery] = useState("");
  const [stops, setStops] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");

  async function searchStops() {
    if (!query.trim()) {
      setMessage("Enter a location.");
      setStops([]);
      return;
    }

    setMessage("Searching...");
    setStops([]);
    setArrivals([]);

    try {
      const res = await fetch(
        `https://api.tfl.gov.uk/StopPoint/Search/${encodeURIComponent(query)}?maxResults=10`
      );

      const data = await res.json();

      if (!data.matches || data.matches.length === 0) {
        setMessage("No stops found.");
        return;
      }

      setStops(data.matches);
      setMessage("");
    } catch {
      setMessage("Error loading data.");
    }
  }

  async function getArrivals(stop) {
    setSelected(stop.name);
    setArrivalMessage("Loading...");
    setArrivals([]);

    try {
      const res = await fetch(
        `https://api.tfl.gov.uk/StopPoint/${stop.id}/Arrivals`
      );

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setArrivalMessage("No live arrivals.");
        return;
      }

      setArrivals(
        data
          .sort((a, b) => a.timeToStation - b.timeToStation)
          .slice(0, 6)
      );
      setArrivalMessage("");
    } catch {
      setArrivalMessage("Error loading arrivals.");
    }
  }

  return (
    <div>
      <h2>Nearby Stops</h2>

      <p>Search stops and view live arrivals.</p>

      <div className="card">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Waterloo"
        />

        <br /><br />

        <button onClick={searchStops}>Search</button>
      </div>

      {message && <p>{message}</p>}

      {stops.length > 0 && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Modes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stops.map((stop) => (
                <tr key={stop.id}>
                  <td>{stop.name}</td>
                  <td>{stop.modes?.join(", ")}</td>
                  <td>
                    <button onClick={() => getArrivals(stop)}>
                      Arrivals
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && <h3>{selected}</h3>}

      {arrivalMessage && <p>{arrivalMessage}</p>}

      {arrivals.length > 0 && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Destination</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {arrivals.map((a) => (
                <tr key={a.id}>
                  <td>{a.lineName}</td>
                  <td>{a.destinationName}</td>
                  <td>{Math.ceil(a.timeToStation / 60)} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NearbyStops;