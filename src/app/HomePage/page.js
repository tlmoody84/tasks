"use client"
import React, { useState } from 'react';
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import LogoutButton from "../../components/LogoutButton";

export default function HomePage() {
  const [chores, setChores] = useState([]); // Array to store chores
  // ... (functions to handle CRUD operations, optional for Home Page)
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
export { RegisterForm, LoginForm, LogoutButton  };