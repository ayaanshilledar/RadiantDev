'use client'

import React from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('Login');
  };

  return (
    <div>
      <h1>Welcome to OpenSource</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
