// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { NextAuthProvider } from "@/providers/next-auth-provider";

export const metadata: Metadata = {
  title: "Evaluator - Système d'évaluation",
  description: "Application de gestion des appréciations et évaluations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased min-h-screen bg-gray-50">
        <NextAuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
