// "use client";
// import React, { useState, useEffect } from "react";

// export default function Home() {
//   const [items, setItems] = useState([]);
// <div className="container mx-auto px-4 py-8 text-3xl"
//   useEffect(() => {
//     const initialItems = [
//       { id: 1, name: 'wash dishes' },
//       { id: 2, name: 'do the laundry' },
//       { id: 3, name: 'take out the trash' },
//       { id: 4, name: 'mop the floor' },
//       { id: 5, name: 'clean the bathroom' },
//     ];
//     setItems(initialItems);
//   }, []);
// </div>
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-7xl font-bold mb-4 text-center">Tasks with Tiffany</h1>
//       <ul>
//         {items.map(item => (
//           <li key={item.id} className="mb-2 border-purple-500 border-2 bg-pink-200 text-black font-bold rounded-lg p-2">
//             {item.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

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
    ];
    setItems(initialItems);
  }, []);

  return (
    <div className="container mx-auto px-12 py-12 min-h-screen bg-pink-400"> 
      <h1 className="text-7xl font-bold mb-20 text-center">Tasks with Tiffany</h1>
      <ul className="list-disc">  {/* Use list-disc for bullet points */}
        {items.map((item) => (
          <li key={item.id} className="mb-7 bg-pink-200 text-black font-bold rounded-xl p-2">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}