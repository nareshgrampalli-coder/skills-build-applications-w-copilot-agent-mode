import React, { useEffect, useState } from 'react';
import DataPage from './DataPage';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'activity_type', label: 'Activity type' },
    { key: 'duration', label: 'Duration (min)' },
  ];

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log(`Activities: fetching from ${apiUrl}`);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <DataPage
      title="Activities"
      description="Review logged workouts, cardio sessions, and movement history in one consistent table view."
      items={activities}
      error={error}
      apiUrl={apiUrl}
      columns={columns}
      itemLabel="Activity"
    />
  );
}

export default Activities;
