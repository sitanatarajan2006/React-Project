import { useState } from "react";

function BikeHire() {
  const [postcode, setPostcode] = useState("");
  const [stations, setStations] = useState([]);
  const [message, setMessage] = useState("");

  async function fetchBikeStations() {
    if (!postcode.trim()) {
      setMessage("Enter a postcode.");
      setStations([]);
      return;
    }

    setMessage("Searching...");
    setStations([]);

    try {
      const geoRes = await fetch(
        `https://api.postcodes.io/postcodes/${postcode.replace(/\s/g, "")}`
      );

      const geoData = await geoRes.json();

      if (!geoData.result) {
        setMessage("Invalid postcode.");
        return;
      }

      const { latitude, longitude } = geoData.result;

      const bikeRes = await fetch("https://api.tfl.gov.uk/BikePoint");
      const bikeData = await bikeRes.json();

      const filtered = bikeData
        .map((station) => {
          const bikes = station.additionalProperties.find(
            (p) => p.key === "NbBikes"
          )?.value;

          const docks = station.additionalProperties.find(
            (p) => p.key === "NbEmptyDocks"
          )?.value;

          const dist = Math.sqrt(
            Math.pow(station.lat - latitude, 2) +
              Math.pow(station.lon - longitude, 2)
          );

          return {
            id: station.id,
            name: station.commonName,
            bikes: bikes || "N/A",
            docks: docks || "N/A",
            distance: dist,
          };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10);

      if (filtered.length === 0) {
        setMessage("No nearby bike stations found.");
        return;
      }

      setStations(filtered);
      setMessage("");
    } catch {
      setMessage("Error loading bike data.");
      setStations([]);
    }
  }

  return (
    <div>
      <h2>Bike Hire Availability</h2>

      <p>Enter a postcode to find nearby Santander Cycle stations.</p>

      <input
        type="text"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        placeholder="e.g. SW1A 1AA"
      />

      <br /><br />

      <button onClick={fetchBikeStations}>Find Stations</button>

      {message && <p>{message}</p>}

      {stations.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Station</th>
              <th>Bikes</th>
              <th>Empty Docks</th>
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
      )}
    </div>
  );
}

export default BikeHire;