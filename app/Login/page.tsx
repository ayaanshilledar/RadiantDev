"use client";

import { supabase } from "@/app/lib/SupabaseCilent";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const signInWithProvider = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/search` },
    });
    if (error) console.error(`${provider} sign-in error:`, error.message);
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-16 
                      bg-grey-800">
      <div className="w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="p-8 rounded-2xl bg-white/4 backdrop-blur-md shadow-md">
          <h1 className="text-2xl font-bold text-center mb-2 text-white">
            Welcome to OpenSource
          </h1>
          <p className="text-center text-white/80 mb-6">
            Sign in to continue
          </p>

          {/* Google Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 mb-4  border-white/50 hover:bg-white/30 text-white"
            onClick={() => signInWithProvider("google")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.23 9.23 3.63l6.85-6.85C35.67 2.52 30.2 0 24 0 14.62 0 6.57 5.82 2.69 14.21l7.98 6.19C12.59 13.46 17.86 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.07 24.58c0-1.59-.14-3.11-.39-4.58H24v9.06h12.38c-.54 2.9-2.16 5.36-4.61 7.02l7.2 5.59c4.21-3.88 6.67-9.6 6.67-16.09z"/>
              <path fill="#FBBC05" d="M10.67 28.4c-.48-1.42-.75-2.93-.75-4.4s.27-2.98.75-4.4l-7.98-6.19C1.47 16.39 0 20.06 0 24s1.47 7.61 3.89 10.59l7.98-6.19z"/>
              <path fill="#EA4335" d="M24 48c6.48 0 11.91-2.13 15.88-5.79l-7.2-5.59c-2.04 1.37-4.64 2.18-8.68 2.18-6.14 0-11.41-3.96-13.33-9.5l-7.98 6.19C6.57 42.18 14.62 48 24 48z"/>
            </svg>
            <span>Continue with Google</span>
          </Button>

          {/* GitHub Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-white/20 border border-white/50 hover:bg-white/30 text-white"
            onClick={() => signInWithProvider("github")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.18.08 1.8 1.22 1.8 1.22 1.04 1.79 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.28 1.2-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.83 1.2 3.09 0 4.45-2.69 5.42-5.25 5.7.42.37.8 1.1.8 2.23 0 1.61-.01 2.91-.01 3.31 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
            </svg>
            <span>Continue with GitHub</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
