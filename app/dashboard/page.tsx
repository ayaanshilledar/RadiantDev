'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/app/lib/SupabaseCilent'; 
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push('/'); // Redirect to home if no logged in user
      } else {
        console.log('User is logged in');
      }
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to home after logout
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
