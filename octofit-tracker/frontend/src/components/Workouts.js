import React, { useEffect, useState } from 'react';
import DataPage from './DataPage';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
  ];

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log(`Workouts: fetching from ${apiUrl}`);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <DataPage
      title="Workouts"
      description="Browse the workout library with the same card-driven layout, shared search form, and reusable details modal."
      items={workouts}
      error={error}
      apiUrl={apiUrl}
      columns={columns}
      itemLabel="Workout"
    />
  );
}

export default Workouts;
