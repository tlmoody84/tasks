//    "use client";
// import React, { useEffect, useState } from 'react';
// import { getAllDocuments, addDocument, deleteDocument } from '../../utils/firebaseUtils';
// import { db } from '../../../firebase.config';
// import AddChoreForm from '../../components/AddChoreForm';
// import RegisterForm from "../../components/RegisterForm";
// import LoginForm from "../../components/LoginForm";
// import LogoutButton from "../../components/LogoutButton";
// import { deleteDoc } from 'firebase/firestore';

// export default function ManagementPage() {
//   const [chores, setChores] = useState([]);
//   const [newChore, setNewChore] = useState('');
//   const [newChoreDetails, setNewChoreDetails] = useState('');
//   const [searchTerm, setSearchTerm] = useState(''); 

//   useEffect(() => {
//     async function fetchData() {
//       // try to get all documents, if you cant, catch the error
//       try {
//         const documents = await getAllDocuments(db, "chores");
//         const choreInstances = documents.map((doc) => {
//           return new chores(doc.completed, doc.details, doc.type);
//         });
//         setChores( new chores(chores.name, choreInstances));
//       } catch (error) {
//         console.log("Failed fetching data", error);
//       }
//     }
//     fetchData();
//     return () => {
//       console.log("get all docs cleanup");
//     };
//   }, [chores]);
//   const addChore = (type, details = '') => {
//     setChores([...chores, { id: Date.now(), type, details, completed: false }]);
//     setNewChore('');
//     setNewChoreDetails('');
//   };
//   const handleDeleteChore = (choreId) =>
//     setChores(chores.filter((chore) => chore.id !== choreId));
//   const handleEdit = (choreId) =>
//     setChores(chores.filter((chore) => chore.id !== choreId));
//   const handleMarkComplete = (choreId) =>
//     setChores(
//       chores.map((chore) =>
//         chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
//       )
//     );

//     const handleAddChore = (type, details = '') => ({
//       type: 'ADD_CHORE',
//       payload: { type, details }
//   });
//   return (
//     <div className="container mx-auto px-6 py-9 bg-purple-700">
//       <center><h1>Manage Chores</h1></center>
//       <div className="flex flex-col my-6 text-white">
//         <h2>CHORES TO BE COMPLETED</h2>
//         <LogoutButton />
//         <RegisterForm />
//         <LoginForm />
//       </div>
//       <AddChoreForm handleAddChore={handleAddChore} />

//       <div className="flex flex-col my-6 text-yellow-500">
//         <h2>Existing Chores</h2>
//       </div>
//       <ul className="list-disc">
//         {chores.filter((chore) =>
//           chore.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (chore.details && chore.details.toLowerCase().includes(searchTerm.toLowerCase()))
//         ).map((chore) => (
//           <li key={chore.id} className="flex justify-between items-center mb-6 text-pink-300">
//             <span
//               className={`${chore.completed ? 'text-black-500 line-through' : ''}`}
//             >
//               {chore.type} {chore.details && ` (${chore.details})`}
//             </span>
//             <div className="flex space-x-5">
//             <button
//   className="bg-green-500 text-white py-2 px-4 rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//   onClick={() => handleEdit(chore.id)}
// >
//   Edit Chore
// </button>

// <button
//   className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//   onClick={() => handleDeleteChore(chore.id)}
// >
//   Delete
// </button>

// <button
//   className={`bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ${chore.completed ? 'disabled opacity-50 cursor-not-allowed' : ''}`}
//   onClick={() => handleMarkComplete(chore.id)}
//   disabled={chore.completed}
// >
//   Mark {chore.completed ? 'Done' : 'Complete'}
// </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export { deleteDocument }; // Assuming this is used elsewhere




"use client";
import React, { useEffect, useState } from 'react';
import { getAllDocuments, addDocument, deleteDocument } from '../../utils/firebaseUtils';
import { db } from '../../../firebase.config';
import AddChoreForm from '../../components/AddChoreForm';
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import LogoutButton from "../../components/LogoutButton";
import { deleteDoc } from 'firebase/firestore';

export default function ManagementPage() {
  const [chores, setChores] = useState([]);
  const [newChore, setNewChore] = useState('');
  const [newChoreDetails, setNewChoreDetails] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const documents = await getAllDocuments(db, "chores");
        const choreInstances = documents.map((doc) => {
          return new Chore(doc.completed, doc.details, doc.type); 
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
  }, [chores]); 

  const addChore = (type, details = '') => {
    setChores([...chores, { id: Date.now(), type, details, completed: true }]);
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

  const handleAddChore = (type, details = '') => ({
    type: 'ADD_CHORE',
    payload: { type, details }
  });

  return (
    <div className="container mx-auto px-6 py-9 bg-purple-700">
      <center>
        <h1>Manage Chores</h1>
      </center>
      <div className="flex flex-col my-6 text-white">
        <h2>CHORES TO BE COMPLETED</h2>
        <LogoutButton />
        <RegisterForm />
        <LoginForm />
      </div>
      <AddChoreForm handleAddChore={handleAddChore} />

      <div className="flex flex-col my-6 text-yellow-500">
        <h2>Existing Chores</h2>
      </div>
      <ul className="list-disc">
        {chores.filter((chore) =>
          chore.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (chore.details && chore.details.toLowerCase().includes(searchTerm.toLowerCase()))
        ).map((chore) => (
          <li key={chore.id} className="flex justify-between items-center mb-6 text-pink-300">
            <span
              className={`${chore.completed ? 'text-black-500 line-through' : ''}`}
            >
              {chore.type} {chore.details && ` (${chore.details})`}
            </span>
            <div className="flex space-x-5">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                onClick={() => handleEdit(chore.id)}
              >
                Edit Chore
              </button>

              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDeleteChore(choreId)}
              >
                Delete
              </button>

              <button
                className={`bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ${chore.completed ? 'disabled opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleMarkComplete(choreId)}
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
};

export { deleteDocument };