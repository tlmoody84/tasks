"use client";
import React, { useState, useEffect } from 'react';
import { getAllDocuments, addDocument, updateDocuments, } from '../utils/firebaseUtils';
import { db } from '../../../firebase.config';

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
          return { completed: doc.completed, details: doc.details, type: doc.type };
        });
        setChores(choreInstances);
      } catch (error) {
        console.log("Failed fetching data", error);
      }
    }
  
    fetchData();
    return () => {
      console.log("get all docs cleanup");
    };
  }, []);
  

  
  const addChore = (type, details = '') => {
    setChores([...chores, { id: Date.now(), type, details, completed: false }]);
    setNewChore('');
    setNewChoreDetails('');
  };

  const handleDeleteChore = (choreId) =>
    setChores(chores.filter((chore) => chore.id !== choreId));

  const handleEditChore = (choreId) => {
    const choreToEdit = chores.find(chore => chore.id === choreId);
    setEditingChoreId(choreId);
    setEditChoreType(choreToEdit.type);
    setEditChoreDetails(choreToEdit.details || ''); // Set details if available
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
    await updateDocument(db, "chores", editingChoreId, { type: editChoreType, details: editChoreDetails });
  } catch (error) {
    console.error("Failed updating chore:", error);
  }
    const updatedChores = chores.map(chore => 
      chore.id === editingChoreId ? { ...chore, type: editChoreType, details: editChoreDetails } : chore
    );
    setChores(updatedChores);
    setEditingChoreId(null); // Reset editing state
    setEditChoreType('');
    setEditChoreDetails('');
  }
  };

   const handleMarkComplete = (choreId) =>
    setChores(
      chores.map((chore) =>
        chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
      )
    );
    
      const handleAddChore = (e) => {
    e.preventDefault();
    addChore(newChore, newChore === 'laundry' ? newChoreDetails : '');
  
  
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
        )
      }
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
                  {editingChoreId !== chore.id && (
                    <> {/* Show edit and delete buttons if not editing */}
                      <button
                        className="bg-green-500 text-black rounded hover:bg-pink-700"
                        onClick={() => handleEditChore(chore.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-green-500 text-black rounded hover:bg-pink-700"
                        onClick={() => handleDeleteChore(chore.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {editingChoreId === chore.id && (  {/* Show edit form if editing */} 
                  (<form onSubmit={handleSaveEdit}>
                      <div className="flex flex-col my-5 text-black">
                        <label htmlFor={`editChoreType-${chore.id}`}>Chore:</label>
                        <input
                          id={`editChoreType-${chore.id}`}
                          name="editChoreType"
                          value={editChoreType}
                          onChange={(e) => setEditChoreType(e.target.value)}
                        />
                      </div>
                      {editChoreType === 'laundry' && (
                        <div className="flex flex-col mt-2 text-pink-700">
                          <label htmlFor={`editLaundryDetails-${chore.id}`}>
                            Laundry Details (Optional):
                          </label>
                          <textarea
                            id={`editLaundryDetails-${chore.id}`}
                            name="editLaundryDetails"
                            rows={3}
                            value={editChoreDetails}
                            onChange={(e) => setEditChoreDetails(e.target.value)}
                          />
                        </div>
                      )}
                      <button type="submit">Save Edit</button>
                    </form>
                  )
                  )}
                </div>
              </li>
            ))}
          </ul>
         </div>
           )}
      