import React, { useState } from 'react';

export default function HomePage() {
  const [chores, setChores] = useState([]); // Array to store chores

   return (
    <div className="container mx-auto px-4 py-8">
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