import React, { useState } from 'react';

export default function AddChoreForm({ handleAddChore }) {
  const [newChore, setNewChore] = useState('');
  const [newChoreDetails, setNewChoreDetails] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedChoreId, setSelectedChoreId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const chores = [
    { id: 1, chore: "Wash dishes", isComplete: false },
    // ... rest of the chores
  ];

  // ... rest of the function body (handleEditClick, handleMarkComplete, etc.)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      handleEditChore(selectedChoreId, newChore, newChoreDetails);
    } else {
      handleAddChore(newChore, newChoreDetails);
    }
    setIsEditing(false);
    setNewChore('');
    setSelectedChoreId(null);
  };

  const filteredChores = chores.filter((chore) =>
    chore.chore.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-6">
        <label htmlFor="searchChore" className="text-xl font-sm text-pink-500">
          Chores:
        </label>
        <input
          type="text" // Change to "text" for text input
          className="border border-pink-700 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-purple-900 focus:ring-1"
          placeholder="Search chores..."
          id="searchChore" // Add ID for association
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ color: 'black' }}
        />
        {newChore === '' && (
          <div className="flex flex-col mt-2 text-pink-700">
            <label htmlFor="Details" className="text-sm font-medium text-pink-700">
              Details (Optional):
            </label>
            <textarea
              id="Details"
              name="Details"
              rows={3}
              value={newChoreDetails}
              onChange={(e) => setNewChoreDetails(e.target.value)}
              className="w-full px-3 py-2 rounded-md border shadow-sm"
            />
          </div>
        )}

        {filteredChores.map((chore) => (
          <div key={chore.id} className="flex justify-between items-center mb-2">
            <p>{chore.chore}</p> {/* Use chore.chore for the chore description */}
            <div className="flex justify-end mt-4"> {/* Added closing curly brace */}
              {isEditing ? (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-pink-600 text-black rounded shadow-sm"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-pink-600 text-white rounded shadow-sm"
                >
                  Add Chore
                </button>
              )}
              <button
                type="button"
                className="px-4 py-2 ml-2 bg-blue-500 hover:bg-pink-600 text-white rounded shadow-sm"
                disabled={!isEditing} // Disable edit button when not in edit mode
                onClick={() => handleEditClick(selectedChoreId)} // Pass selected ID
              >
                 Edit
              </button>
              <button
                type="button"
                className="px-4 py-2 ml-2 bg-red-500 hover:bg-red-600 text-white rounded shadow-sm"
                disabled={!isEditing}
                onClick={() => handleDeleteClick(choreId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      </form>
  )}
