import { useEffect, useState } from "react";

function Dashboard() {
  const [favourites, setFavourites] = useState([]);
  const [selectedJourney, setSelectedJourney] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("favouriteJourneys");

    if (saved) {
      setFavourites(JSON.parse(saved));
    }
  }, []);

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

      <p>View your saved favourite journeys.</p>

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