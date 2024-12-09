"use client";

import { addUser, fetchUsers } from "@/app/users/usersService";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<
    { id: number; name: string; email: string; isVip: boolean; isActive: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newIsActive, setNewIsActive] = useState(true);
  const [newIsVip, setNewIsVip] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to load users.");
      } else {
        setError("Failed to load users.");
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
      alert("Name and Email are required.");
      return;
    }

    setIsAdding(true);
    try {
      const newUser = await addUser(newName, newEmail, newIsActive, newIsVip);
      if (newUser) {
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setNewName("");
        setNewEmail("");
        setNewIsVip(false);
        setNewIsActive(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to add user.");
      } else {
        setError("Failed to add user.");
      }
    } finally {
      setNewName(''); 
      setNewEmail('');
      setNewIsActive(true);
      setNewIsVip(false);
      setIsAdding(false);
      loadUsers();
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-400 animate-pulse">Loading Users...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <section className="p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">User Management</h2>

      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-800">
                <td className="border border-gray-700 px-4 py-2">{user.id}</td>
                <td className="border border-gray-700 px-4 py-2">{user.name}</td>
                <td className="border border-gray-700 px-4 py-2">{user.email}</td>
                <td
                  className={`border border-gray-700 px-4 py-2 font-semibold ${
                    user.isVip ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  {user.isVip ? "VIP" : "Regular"}
                </td>
                <td
                  className={`border border-gray-700 px-4 py-2 font-semibold ${
                    user.isActive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h3 className="text-xl font-semibold mb-4">Add New User</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-white rounded px-4 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-white rounded px-4 py-2"
          />
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={newIsActive}
              onChange={(e) => setNewIsActive(e.target.checked)}
              className="w-4 h-4"
            />
            Active User
          </label>
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={newIsVip}
              onChange={(e) => setNewIsVip(e.target.checked)}
              className="w-4 h-4"
            />
            Vip User
          </label>
          <button
            onClick={handleAddUser}
            disabled={isAdding}
            className={`w-full px-4 py-2 rounded ${
              isAdding
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            } text-white font-bold`}
          >
            {isAdding ? "Adding..." : "Add User"}
          </button>
        </div>
      </div>
    </section>
  );
}