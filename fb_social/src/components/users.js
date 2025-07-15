import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*');

      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        console.log('Fetched users:', data);
        setUsers(data);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.username}</strong> – {user.email}
            </li>
          ))}
        </ul>
      )}

      <pre style={{ marginTop: '2rem', background: '#f4f4f4', padding: '1rem' }}>
        {/* Debug output */}
        {JSON.stringify(users, null, 2)}
      </pre>
    </div>
  );
}

export default App;
