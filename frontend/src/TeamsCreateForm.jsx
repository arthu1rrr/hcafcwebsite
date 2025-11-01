import { useState } from "react";
import { createTeam } from "./api";

export default function TeamsCreateForm({ onTeamCreated }) {
    const [form,setForm] = useState({
        name: '',
        level: '',
        code: '',
    });
    const [status, setStatus] = useState('idle'); 
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    function update(field){
        return (e) => setForm({
            ...form,
           
            [field]: e.target.value,
        });
    }
    async function handleSubmit(e){
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');
        if (!form.name || !form.level || !form.code){
            setStatus('error');
            setErrorMsg('All fields are required.');
            return;
        }
        try {
            const newTeam = await createTeam(form);
            setStatus('success');
            setForm({
                name: '',
                level: '',
                code: '',
            });
            if (onTeamCreated) onTeamCreated(newTeam);
        } catch (e) {
            console.error(e);
            setStatus('error');
            setErrorMsg('Failed to create team. Please try again.');
        }
    }
    return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
      <label>
        Name
        <input
          value={form.name}
          onChange={update('name')}
          placeholder="Homerton 1st XI"
        />
      </label>
      <label>
        Code
        <input
          value={form.code}
          onChange={update('code')}
          placeholder="1st / 2nd / 4th / Women / NB"
        />
      </label>
      <label>
        Level
        <input
          value={form.level}
          onChange={update('level')}
          placeholder="1st / 2nd / Women / NB"
        />
      </label>

      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Creating…' : 'Create Team'}
      </button>

      {status === 'error' && <p style={{ color: 'crimson' }}>{errorMsg}</p>}
      {status === 'success' && <p style={{ color: 'green' }}>Team created!</p>}
    </form>
  );
}