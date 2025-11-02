import logo from './logo.svg';
import './App.css';
import TeamsList from './teamList';
import PlayersList from './playersList';
import TeamsCreateForm from './TeamsCreateForm';
import React, { useState } from 'react';


function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleCreated() {
    setRefreshKey((k) => k + 1); // trigger TeamsList to refetch
  }

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', padding: '1rem' }}>
      <h1>HCAFC Teams</h1>
      <TeamsCreateForm onCreated={handleCreated} />
      <TeamsList refreshKey={refreshKey} />
      <hr style={{ margin: "2rem 0" }} />
      <h2>Players</h2>
      <PlayersList />
    </main>
  );
}



export default App;



