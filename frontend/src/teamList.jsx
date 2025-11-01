import { useEffect, useState } from 'react';
import { fetchTeams } from './api';

export default function TeamsList({refreshKey = 0}) {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | error

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setStatus('loading');
      try {
        const data = await fetchTeams();
        if (!cancelled) {
          setTeams(data);
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

  if (status === 'loading') return <p>Loading teams…</p>;
  if (status === 'error') return <p>Couldn’t load teams. Is the backend running on :8000?</p>;
  if (teams.length === 0) return <p>No teams yet.</p>;

  return (
    <ul>
      {teams.map(t => (
        <li key={t.id}>
          <strong>{t.name}</strong> — {t.level} ({t.code})
        </li>
      ))}
    </ul>
  );
}
