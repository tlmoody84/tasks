"use client";
 import React, { useState, useEffect } from "react";

 export default function Home() {
 const [items, setItems] = useState([]);

   useEffect(() => {
     const initialItems = [
       { id: 1, name: 'Wash dishes' },
       { id: 2, name: 'Do the laundry' },
       { id: 3, name: 'Take out the trash' },
       { id: 4, name: 'Mop the floor' },
       { id: 5, name: 'Clean the bathroom' },
       { id: 6, name: 'Walk the dog' },
       { id: 7, name: 'Water the plants' },
     ];
     setItems(initialItems);
   }, []);

  return (
    <div className="container mx-auto px-12 py-12 min-h-screen bg-pink-400"> 
      <h1 className="text-7xl font-bold mb-20 text-center">Tasks with Tiffany</h1>
      <ul className="list-disc">  
        {items.map((item) => (
          <li key={item.id} className="mb-7 bg-pink-200 text-black font-bold rounded-xl p-2">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}





// export default function Page() {
//   const [chores, setChores] = useState([]); // Array to store chores
//   // ... (functions to handle CRUD operations, optional for Home Page)
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1>My Chores</h1>
//       <ul className="list-disc">
//         {chores.map((chore) => (
//           <li key={chore.id} className="mb-2">
//             {chore.type === '' ? 'Washing Dishes' : 'Laundry'}
//             {chore.details && ` (${chore.details})`}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export { RegisterForm, LoginForm, LogoutButton  };