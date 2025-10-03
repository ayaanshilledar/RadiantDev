'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/SupabaseCilent'; 

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleAuth() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('OAuth callback error:', error.message);
          router.push('/auth/error');
        } else {
          if (data?.session?.user) {
            console.log('User authenticated:', data.session.user.email);
          }
          router.push('/dashboard'); // Redirect to dashboard/home after successful login
        }
      } catch (err) {
        console.error('Unexpected error during auth callback:', err);
        router.push('/auth/error');
      } finally {
        setLoading(false);
      }
    }

    handleAuth();
  }, [router]);

  if (loading) return <p>Loading authentication...</p>;

  return null;
}

