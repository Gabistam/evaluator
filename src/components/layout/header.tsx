"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/"
          className="flex items-center gap-2"
        >
          <span className="text-2xl">📊</span>
          <span className="font-semibold text-xl font-geist-sans">Evaluator</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          {session && (
            <Link
              href="/favorites"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Star className="w-5 h-5" />
              <span>Favoris</span>
            </Link>
          )}

          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}