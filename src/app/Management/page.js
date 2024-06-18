// "use client";
// import React, { useState } from 'react';

// export default function ManagementPage() {
//   const [chores, setChores] = useState([]); // Array to store chores
//   const [newChoreType, setNewChoreType] = useState('dishes'); // Default to dishes
//   const [newChoreDetails, setNewChoreDetails] = useState(''); // Optional details for laundry
  
//   // ... (functions to handle CRUD operations)

//   const handleAddChore = (e) => {
//     e.preventDefault(); // Prevent default form submission

//     const newChore = {
//       id: Date.now(),
//       type: newChoreType,
//       details: newChoreDetails,
//       completed: false,
//     };
//     setChores([...chores, newChore]);
//     setNewChoreDetails(''); // Clear details after adding laundry chore
//   };

//   const handleDeleteChore = (choreId) => {
//     // Update state to remove the chore with matching ID
//     setChores(chores.filter((chore) => chore.id !== choreId));
//   };

//   const handleMarkComplete = (choreId) => {
//     setChores(
//       chores.map((chore) =>
//         chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
//       )
//     );
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1>Manage Chores</h1>
//       <h2>Add New Chore</h2>
//       <form onSubmit={handleAddChore}>
//         <div className="flex flex-col mb-4">
//           <label htmlFor="choreType" className="text-sm font-medium text-gray-700 mb-2">
//             Chore Type:
//           </label>
//           <select
//             id="choreType"
//             name="choreType"
//             className="px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300"
//             value={newChoreType}
//             onChange={(e) => setNewChoreType(e.target.value)}
//                       >
//                         <option value="dishes">Washing Dishes</option>
//                         <option value="laundry">Laundry</option>
//                         <option value="trash">Trash</option>
//                         <option value="mop">Mop</option>
//                         <option value="bathroom">Bathroom</option>
//                       </select>
//                     </div>
//                     {newChoreType === 'laundry' && (
//                       <div className="flex flex-col mt-2">
//                         <label htmlFor="laundryDetails" className="text-sm font-medium text-gray-700 mb-2">
//                           Laundry Details (Optional):
//                         </label>
//                         <textarea
//                           id="laundryDetails"
//                           name="laundryDetails"
//                           rows={3}
//                           className="px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300"
//                           value={newChoreDetails}
//                           onChange={(e) => setNewChoreDetails(e.target.value)}
//                         />
//                       </div>
//                     )}
//                     <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4">
//                       Add Chore
//                     </button>
//                   </form>
            
//                   <h2>Existing Chores</h2>
//                   <ul className="list-disc">
//                     {chores.map((chore) => (
//                       <li key={chore.id} className="flex justify-between items-center mb-2">
//                         <span
//                           className={`${chore.completed ? 'text-green-500 line-through' : ''}`}
//                         >
//                           {chore.type === 'dishes' ? 'Washing Dishes' : 'Laundry'}
//                           {chore.details && ` (${chore.details})`}
//                         </span>
//                         <div className="flex space-x-2">
//                           <button
//                             className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700"
//                             onClick={() => handleMarkComplete(chore.id)}
//                             disabled={chore.completed}
//                           >
//                             Mark {chore.completed ? 'Done' : 'Complete'}
//                           </button>
//                           <button
//                             className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
//                             onClick={() => handleDeleteChore(chore.id)} // typo fixed
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               );
//             } 
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