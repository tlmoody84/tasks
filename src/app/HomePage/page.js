"use client";
// import { first } from 'lodash';
import React, { useState } from 'react';
import { db } from "../../firebase.config";
import { getAllDocuments } from "@utils/firebase";

export default function HomePage() {
  const [chores, setChores] = useState([]); // Array to store chores
  setChores([...chores, { type: "tasks", details: "Tasks with Tiffany" }]);
  
   useEffect(() => {
    async function fetchData() {
      try {
        const choresCollection = collection(db, "chores"); // Reference the chores collection
        const choresSnapshot = await getDocs(choresCollection); // Get documents from collection

        const fetchedChores = choresSnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID for unique keys
          ...doc.data(), // Spread document data for easy access
        }));

        setChores(fetchedChores);
      } catch (error) {
        console.error("Error fetching chores:", error);
      }
    }

    fetchData(); // Call fetchData on component mount
  }, []); // Empty dependency array to run useEffect only once
   return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1>My Chores</h1>
      <ul className="list-disc">
        {chores.map((chore) => (
          <li key={chore.id} className="mb-2">
            {chore.type === 'dishes' ? 'Washing Dishes' : 'Laundry'}
            {chore.details && ` (${chore.details})`}
          </li>
        ))}
      </ul>
    </div>
  );
}