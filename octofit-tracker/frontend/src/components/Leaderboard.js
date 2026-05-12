import React, { useEffect, useState } from 'react';
import DataPage from './DataPage';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    {
      key: 'rank',
      label: 'Rank',
      accessor: (_entry, index) => index + 1,
      render: (_entry, index) => <span className="badge text-bg-dark">#{index + 1}</span>,
    },
    { key: 'user', label: 'User' },
    { key: 'score', label: 'Score' },
  ];

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log(`Leaderboard: fetching from ${apiUrl}`);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <DataPage
      title="Leaderboard"
      description="Compare top performers, scan current rankings, and open any record in a shared detail modal."
      items={entries}
      error={error}
      apiUrl={apiUrl}
      columns={columns}
      itemLabel="Leaderboard entry"
    />
  );
}

export default Leaderboard;
