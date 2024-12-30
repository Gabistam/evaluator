"use client";

import { useSession } from "next-auth/react";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { CategoryList } from "@/components/features/categories/category-list";
import { getCategories } from "@/lib/data";
import { useEffect, useState } from "react";
import { Category } from "@/types/index";

export default function HomePage() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  if (session) {
    // Utilisateur connecté : afficher les catégories
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluator</h1>
        <CategoryList categories={categories} />
      </div>
    );
  }

  // Utilisateur non connecté : afficher le hero
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue sur Evaluator
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Gérez vos appréciations et évaluations de manière simple et efficace.
          Connectez-vous pour accéder à toutes les fonctionnalités.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}