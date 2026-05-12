import React, { useEffect, useState } from 'react';
import DataPage from './DataPage';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    { key: 'name', label: 'Name' },
    {
      key: 'members',
      label: 'Members',
      accessor: (team) => (Array.isArray(team.members) ? team.members.join(', ') : team.members),
    },
  ];

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log(`Teams: fetching from ${apiUrl}`);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <DataPage
      title="Teams"
      description="Keep team rosters readable with the same Bootstrap card, filter form, table, and modal pattern used everywhere else."
      items={teams}
      error={error}
      apiUrl={apiUrl}
      columns={columns}
      itemLabel="Team"
    />
  );
}

export default Teams;
