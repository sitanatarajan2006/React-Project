function TravelModes() {
  return (
    <div>
      <h2>Travel Modes</h2>

      <p>
        Overview of common urban transport options, including benefits and
        limitations.
      </p>

      <div className="card">
        <h3>Bus</h3>
        <p>Low-cost and widely available across London.</p>
        <p>Can be affected by traffic and congestion.</p>
      </div>

      <div className="card">
        <h3>Rail / Tube</h3>
        <p>Fast and efficient for medium to long journeys.</p>
        <p>Can be expensive and crowded during peak times.</p>
      </div>

      <div className="card">
        <h3>Cycling</h3>
        <p>Free and environmentally friendly.</p>
        <p>Weather dependent and requires safe routes.</p>
      </div>

      <div className="card">
        <h3>Walking</h3>
        <p>Best for short distances and completely free.</p>
        <p>Not practical for long journeys.</p>
      </div>
    </div>
  );
}

export default TravelModes;