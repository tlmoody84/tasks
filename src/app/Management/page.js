"use client";
import React, { useState } from 'react';

export default function ManagementPage() {
  const [chores, setChores] = useState([]);
  const [newChore, setNewChore] = useState('');
  const [newChoreDetails, setNewChoreDetails] = useState('');

  const addChore = (type, details = '') => {
    setChores([...chores, { id: Date.now(), type, details, completed: false }]);
    setNewChore('');
    setNewChoreDetails('');
  };

  const handleDeleteChore = (choreId) =>
    setChores(chores.filter((chore) => chore.id !== choreId));

  const handleMarkComplete = (choreId) =>
    setChores(
      chores.map((chore) =>
        chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
      )
    );

    const handleAddChore = (e) => {
    e.preventDefault();
    addChore(newChore, newChore === 'laundry' ? newChoreDetails : '');
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <center><h1>Manage Chores</h1></center>
      <h2>Add New Chore</h2>
      <form onSubmit={handleAddChore}>
        <div className="flex flex-col mb-4">
          <label htmlFor="newChore">Chore:</label>
          <input
            id="newChore"
            name="newChore"
            value={newChore}
            onChange={(e) => setNewChore(e.target.value)}
          />
        </div>
        {newChore === 'laundry' && (
          <div className="flex flex-col mt-2">
            <label htmlFor="laundryDetails">Laundry Details (Optional):</label>
            <textarea
              id="laundryDetails"
              name="laundryDetails"
              rows={3}
              value={newChoreDetails}
              onChange={(e) => setNewChoreDetails(e.target.value)}
            />
          </div>
        )}
        <button type="submit">Add Chore</button>
      </form>

      <h2>Existing Chores</h2>
      <ul className="list-disc">
        {chores.map((chore) => (
          <li key={chore.id} className="flex justify-between items-center mb-2">
            <span
              className={`${chore.completed ? 'text-orange-500 line-through' : ''}`}
            >
              {chore.type} {chore.details && ` (${chore.details})`}
            </span>
            <div className="flex space-x-2">
              <button
                className="bg-green-500 text-black rounded hover:bg-pink-700"
                onClick={() => handleMarkComplete(chore.id)}
                disabled={chore.completed}
              >
                Mark {chore.completed ? 'Done' : 'Complete'}
              </button>
              <button
                className="bg-red-500 text-black rounded hover:bg-yellow-700"
                onClick={() => handleDeleteChore(chore.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}