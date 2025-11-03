const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

export async function fetchTeams() {
  const res = await fetch(`${BASE}/api/teams/`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function createTeam(payLoad){
    const res = await fetch(`${BASE}/api/teams/`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}

export async function fetchPlayers() {
    const res = await fetch(`${BASE}/api/players/`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}

export async function fetchMatches(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `${BASE}/api/matches/${query ? `?${query}` : ""}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}
