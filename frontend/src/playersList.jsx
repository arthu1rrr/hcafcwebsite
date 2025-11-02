import { useEffect, useState } from "react";    
import { fetchPlayers } from "./api";

export default function PlayersList({ refreshKey = 0 }) {
    const [players, setPlayers] = useState([]);
    const [status, setStatus] = useState('idle'); // idle | loading | error

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setStatus('loading');
            try {
                const data = await fetchPlayers();
                if (!cancelled) {
                    setPlayers(data);
                    setStatus('idle');
                }
            } catch (e) {
                if (!cancelled) setStatus('error');
                console.error(e);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [refreshKey]);

    if (status === 'loading') return <p>Loading players…</p>;
    if (status === 'error') return <p>Couldn’t load players. Is the backend running on :8000?</p>;
    if (players.length === 0) return <p>No players yet.</p>;

    return (
       (
    <div style={{ display: "grid", gap: "1rem" }}>
      {players.map((p) => (
        <div
          key={p.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: "0.5rem 1rem",
          }}
        >
          {p.headshot ? (
            <img
              src={`http://localhost:8000${p.headshot}`}
              alt={`${p.first_name} ${p.last_name}`}
              style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                fontSize: "0.9rem",
              }}
            >
              N/A
            </div>
          )}
          <div>
            <div style={{ fontWeight: 600 }}>
              {p.first_name} {p.last_name}
            </div>
            <div style={{ opacity: 0.8 }}>
              {p.position || "–"} · Team #{p.primary_team}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
    );
}