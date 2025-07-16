import React from "react";
import { Link } from "react-router-dom";

export function Profile({ id }: { id?: string }) {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>Profile</h1>
      <p>This is the Profile page. User ID: {id ?? 'unknown'}</p>
      <p>
        <Link to="/">Ana sayfaya dön</Link>
      </p>
    </main>
  );
} 