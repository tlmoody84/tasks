import React, { useState } from 'react';

export default function AddChoreForm({ handleAddChore }) {
  const [newChore, setNewChore] = useState('');
  const [newChoreDetails, setNewChoreDetails] = useState('');

  return (

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
  )
}
