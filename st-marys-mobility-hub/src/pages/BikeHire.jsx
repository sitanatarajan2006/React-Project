import { useState } from "react";

function BikeHire() {
  const [postcode, setPostcode] = useState("");
  const [stations, setStations] = useState([]);
  const [message, setMessage] = useState("");

  async function fetchStations() {
    if (!postcode.trim()) {
      setMessage("Enter a postcode.");
      setStations([]);
      return;
    }

    setMessage("Searching...");
    setStations([]);

    try {
      const geo = await fetch(
        `https://api.postcodes.io/postcodes/${postcode.replace(/\s/g, "")}`
      );

      const geoData = await geo.json();

      if (!geoData.result) {
        setMessage("Invalid postcode.");
        return;
      }

      const { latitude, longitude } = geoData.result;

      const res = await fetch("https://api.tfl.gov.uk/BikePoint");
      const data = await res.json();

      const nearest = data
        .map((s) => {
          const bikes = s.additionalProperties.find(
            (p) => p.key === "NbBikes"
          )?.value;

          const docks = s.additionalProperties.find(
            (p) => p.key === "NbEmptyDocks"
          )?.value;

          const dist = Math.sqrt(
            Math.pow(s.lat - latitude, 2) +
              Math.pow(s.lon - longitude, 2)
          );

          return {
            id: s.id,
            name: s.commonName,
            bikes,
            docks,
            dist,
          };
        })
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 10);

      setStations(nearest);
      setMessage("");
    } catch {
      setMessage("Error loading data.");
    }
  }

  return (
    <div>
      <h2>Bike Hire Availability</h2>

      <p>Find nearby Santander Cycle stations.</p>

      <div className="card">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="e.g. SW1A 1AA"
        />

        <br /><br />

        <button onClick={fetchStations}>Search</button>
      </div>

      {message && <p>{message}</p>}

      {stations.length > 0 && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>Bikes</th>
                <th>Docks</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.bikes}</td>
                  <td>{s.docks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BikeHire;