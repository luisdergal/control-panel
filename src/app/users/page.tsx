"use client";

import { addUser, fetchUsers } from '@/app/users/usersService';
import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to load users.');
      } else {
        setError('Failed to load users.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newName || !newEmail) {
      alert('Name and Email are required.');
      return;
    }

    setIsAdding(true);
    try {
      const newUser = await addUser(newName, newEmail);
      if (newUser) {
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setNewName('');
        setNewEmail('');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to add user.');
      } else {
        setError('Failed to add user.');
      }
    } finally {
      setNewName(''); 
      setNewEmail('');
      setIsAdding(false);
      loadUsers();
    }
  };

  if (loading) return <p className="animate-pulse">Loading Users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Add User</h3>
        {}
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border rounded px-2 py-1 mr-2 text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border rounded px-2 py-1 mr-2 text-black"
        />
        <button
          onClick={handleAddUser}
          disabled={isAdding}
          className={`px-4 py-2 rounded ${
            isAdding ? 'bg-gray-400' : 'bg-blue-500 text-white'
          }`}
        >
          {isAdding ? 'Adding...' : 'Add User'}
        </button>
      </div>
    </section>
  );
}