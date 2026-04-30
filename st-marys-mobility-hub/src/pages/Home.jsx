function Home() {
  return (
    <div>
      <h1>St Mary’s Urban Mobility Hub</h1>

      <p>
        Plan smarter journeys, compare travel options, and access live transport
        information across London.
      </p>

      <div className="card">
        <h2>Urban Travel Guidance</h2>
        <p>
          Effective journey planning involves balancing cost, time,
          convenience, and environmental impact. Short journeys may be more
          suitable for walking or cycling, while longer journeys often benefit
          from public transport.
        </p>
      </div>

      <div className="card">
        <h2>Journey Planning Tips</h2>
        <ul>
          <li>Check multiple transport options before travelling</li>
          <li>Allow extra time during peak hours</li>
          <li>Consider cost and environmental impact</li>
          <li>Use active travel for short journeys</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;