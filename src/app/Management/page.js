"use client";
import React, { useEffect, useState } from 'react';
import { getAllDocuments, addDocument } from '../utils/firebaseUtils';
// import { db } from '../../../firebase.config';

export default function ManagementPage() {
  const [chores, setChores] = useState([]);
  const [newChore, setNewChore] = useState('');
  const [newChoreDetails, setNewChoreDetails] = useState('');

  useEffect(() => {
    async function fetchData() {
      // try to get all documents, if you cant, catch the error
      try {
        const documents = await getAllDocuments(db, "chores");
        const choreInstances = documents.map((doc) => {
          return new chores(doc.completed, doc.details, doc.type);
        });
        setChores( new chores(chores.name, choreInstances));
      } catch (error) {
        console.log("Failed fetching data", error);
      }
    }

    fetchData();
    return () => {
      console.log("get all docs cleanup");
    };
  }, [chores]);

  const addChore = (type, details = '') => {
    setChores([...chores, { id: Date.now(), type, details, completed: false }]);
    setNewChore('');
    setNewChoreDetails('');
  };

  const handleDeleteChore = (choreId) =>
    setChores(chores.filter((chore) => chore.id !== choreId));
  const handleEdit = (choreId) =>
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
<div className="container mx-auto px-6 py-9 bg-purple-700">
      <center><h1>Manage Chores</h1></center>
      <div className="flex flex-col my-6 text-white">
      <h2>CHORES TO BE COMPLETED</h2>
      </div>
      <form onSubmit={handleAddChore}>
        <div className="flex flex-col my-5 text-black">
          <label htmlFor="newChore">Chore:</label>
          <input
            id="newChore"
            name="newChore"
            value={newChore}
            onChange={(e) => setNewChore(e.target.value)}
          />
        </div>
        {newChore === 'laundry' && (
          <div className="flex flex-col mt-2 text-pink-700">
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
        <button type="submit text-black">Add Chore</button>
      </form>
      <div className="flex flex-col my-6 text-yellow-500">
      <h2>Existing Chores</h2>
      </div>
      <ul className="list-disc">
        {chores.map((chore) => (
          <li key={chore.id} className="flex justify-between items-center mb-6 text-pink-300">
            <span
              className={`${chore.completed ? 'text-black-500 line-through' : ''}`}
            >
              {chore.type} {chore.details && ` (${chore.details})`}
            </span>
            <div className="flex space-x-5">
              <button
                className="bg-green-500 text-black rounded hover:bg-pink-700"
                onClick={() => handleEdit(chore.id)}
              >
                Edit
              </button>
              <button
                className="bg-green-500 text-black rounded hover:bg-pink-700"
                onClick={() => handleDeleteChore(chore.id)}
              >
                Delete
              </button>
              <button
                className="bg-green-500 text-black rounded hover:bg-pink-700"
                onClick={() => handleMarkComplete(chore.id)}
                disabled={chore.completed}
              >
                Mark {chore.completed ? 'Done' : 'Complete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}














