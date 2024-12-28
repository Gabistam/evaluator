"use client";

import { useAuth } from "@/hooks/use-auth";
import { Category } from "@/types";
import { useState } from "react";

export default function AdminPage() {
  const { isAdmin, isLoading } = useAuth('admin');
  const [categories, setCategories] = useState<Category[]>([]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!isAdmin) {
    return null; // Le hook useAuth redirigera automatiquement
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Administration</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Ajouter une catégorie
        </button>
      </div>

      {/* Liste des catégories avec actions d'administration */}
      <div className="space-y-4">
        {categories.map(category => (
          <div 
            key={category.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.image}</span>
                <h3 className="text-lg font-medium">{category.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
                  Éditer
                </button>
                <button className="px-3 py-1 text-red-600 hover:text-red-900">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}