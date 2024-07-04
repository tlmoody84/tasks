import React, { useState } from 'react';

export default function AddChoreForm({ handleAddChore }) {
  const [newChore, setNewChore] = useState('');
  const [newChoreDetails, setNewChoreDetails] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedChoreId, setSelectedChoreId] = useState(null); // Track selected chore for editing/deleting
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

    const chores = [
    
  ];


  const handleEditClick = (choreId) => {
    setIsEditing(true);
    setSelectedChoreId(choreId);
    // Fetch chore details if needed (assuming handleEditChore expects full chore object)
  };

  const handleMarkComplete = (choreId) => {
    // Implement logic to mark the chore complete (e.g., call a prop handler)
    console.log('Chore', choreId, 'marked complete!');
  };

  const handleDeleteClick = (choreId) => {
    // Implement logic to delete the chore (e.g., call a prop handler)
    console.log('Chore', choreId, 'deleted!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      handleEditChore(selectedChoreId, newChore, newChoreDetails); // Call edit handler with selected ID
    } else {
      handleAddChore(newChore, newChoreDetails); // Call add handler with new data
    }
    setIsEditing(false); // Reset edit mode after submission
    setNewChore(''); // Clear input fields after adding or editing
    setSelectedChoreId(null); // Clear selected ID
  };

  const filteredChores = chores.filter((chore) =>
    chore.type.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter chores based on search term

  return (

    <form onSubmit={handleSubmit}>
       {<div className="flex flex-col space-y-6"> {/* Adjusted spacing */}
   <label htmlFor="newChore" className="text-xl font-sm text-pink-500">
     Chores:
   </label>
   <input
        type="text"
        className="border border-pink-700 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-purple-900 focus:ring-1"
        placeholder="Search chores..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  {newChore === 'laundry' && (
          <div className="flex flex-col mt-2 text-pink-700">
            <label htmlFor="laundryDetails" className="text-sm font-medium text-pink-700">
              Laundry Details (Optional):
            </label>
            <textarea
              id="laundryDetails"
              name="laundryDetails"
              rows={3}
              value={newChoreDetails}
              onChange={(e) => setNewChoreDetails(e.target.value)}
              className="w-full px-3 py-2 rounded-md border shadow-sm"
              disabled={!isEditing} // Disable textarea when not in edit mode
            />
           </div>
        )}
        {/* Here's where the filtered chores are rendered */}
        {filteredChores.map((chore) => (
          <div key={chore.id} className="flex justify-between items-center mb-2">
            <p>{chore.type}</p>
            {/* Add buttons or other UI elements for chores here (edit, delete, etc.) */}
          </div>
        ))}
   
      <div className="flex justify-end mt-4">
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
          disabled={!isEditing} // Disable delete button when not in edit mode
          onClick={() => handleDeleteClick(choreId)} // Call prop handler for deletion logic
        >
          Delete
        </button>
      </div>
</div>
}
    </form>
      )};





