import React, { useEffect, useState } from 'react';
import DataPage from './DataPage';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    { key: 'username', label: 'Username' },
    {
      key: 'email',
      label: 'Email',
      render: (user) => (
        <a className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href={`mailto:${user.email}`}>
          {user.email}
        </a>
      ),
    },
  ];

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log(`Users: fetching from ${apiUrl}`);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <DataPage
      title="Users"
      description="Scan the member directory with a uniform Bootstrap table and quick access links for each email address."
      items={users}
      error={error}
      apiUrl={apiUrl}
      columns={columns}
      itemLabel="User"
    />
  );
}

export default Users;
