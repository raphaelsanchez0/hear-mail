'use client';

import { useEffect, useState } from 'react';

interface User {
  _id: string;
  email: string;
  pass: string;
}

export default function TestMongo() {
  const [data, setData] = useState<User[] | null>(null);

  const addUser = async () => {
    try {
      const response = await fetch('/api/addEmailPassDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'john.doe@example.com', pass: 'PASS1234' }),
      });

      const result = await response.json();
      console.log(result);
      fetchUsers();  // Refresh the user list after adding a new user
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/getEmailPassDB');
      const data: User[] = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>MongoDB Test</h1>
      <button onClick={addUser}>Add User</button>
      <h2>Users:</h2>
      {data ? (
        <ul>
          {data.map((user) => (
            <li key={user._id}>
              {user.email} - Password: {user.pass}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
}
