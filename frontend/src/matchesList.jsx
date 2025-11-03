import { useEffect, useState } from "react";
import { fetchMatches } from "./api";

export default function MatchesList() {
  const [fixtures, setFixtures] = useState([]);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setStatus("loading");
      try {
        const data = await fetchMatches(); // get all matches
        if (!cancelled) {
          const upcoming = data.filter(m => !m.match_completed);
          const played = data.filter(m => m.match_completed);
          setFixtures(upcoming);
          setResults(played);
          setStatus("idle");
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setStatus("error");
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (status === "loading") return <p>Loading matches…</p>;
  if (status === "error") return <p>Couldn’t load matches.</p>;

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      <section>
        <h2>Upcoming Fixtures</h2>
        {fixtures.length === 0 ? (
          <p>No upcoming fixtures.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {fixtures.map(m => (
              <li key={m.id} style={cardStyle}>
                <strong>{m.match_team_name || `Team #${m.match_team}`}</strong> vs {m.team_against}
                <br />
                <small>
                  {m.competition} · {m.venue} · {m.date}
                </small>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Recent Results</h2>
        {results.length === 0 ? (
          <p>No results yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map(m => (
              <li key={m.id} style={cardStyle}>
                <strong>{m.match_team_name || `Team #${m.match_team}`}</strong> vs  {m.team_against}
                <br />
                <small>
                  {m.competition} · {m.venue} · {m.date}
                </small>
                <div>
                  <strong>
                    {m.home_team_score} - {m.away_team_score}
                  </strong>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: "0.75rem 1rem",
  marginBottom: "0.5rem",
  background: "#fafafa",
};
