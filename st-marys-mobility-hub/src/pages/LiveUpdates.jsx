import { useEffect, useState } from "react";

function LiveUpdates() {
  const [lines, setLines] = useState([]);
  const [message, setMessage] = useState("Loading live service updates...");

  useEffect(() => {
    async function fetchServiceUpdates() {
      try {
        const response = await fetch(
          "https://api.tfl.gov.uk/line/mode/tube,overground/status"
        );

        if (!response.ok) {
          throw new Error("Failed to load service updates");
        }

        const data = await response.json();
        setLines(data);
        setMessage("");
      } catch (error) {
        setMessage("Unable to load live service updates.");
      }
    }

    fetchServiceUpdates();
  }, []);

  return (
    <div>
      <h2>Live Service Updates</h2>

      <p>
        This page displays live London Underground service updates using the TfL
        Unified API.
      </p>

      {message && <p>{message}</p>}

      {lines.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Line</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr key={line.id}>
                <td>{line.name}</td>
                <td>{line.lineStatuses[0]?.statusSeverityDescription}</td>
                <td>
                  {line.lineStatuses[0]?.reason
                    ? line.lineStatuses[0].reason
                    : "No additional details"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LiveUpdates;