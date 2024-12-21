"use client";

import { Category, Appreciation } from "@/types";
import { AppreciationList } from "@/components/features/appreciations/appreciation-list";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { updateAppreciation, deleteAppreciation, toggleFavorite } from "@/lib/data";

interface CategoryViewProps {
  initialCategory: Category;
}

export function CategoryView({ initialCategory }: CategoryViewProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setCategory(initialCategory);
    setIsClient(true);
  }, [initialCategory]);

  if (!isClient || !category) {
    return (
      <div className="space-y-6 opacity-0">
        <div className="flex items-center gap-4">
          <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const handleUpdate = (updatedAppreciation: Appreciation) => {
    updateAppreciation(category.id, updatedAppreciation.id, updatedAppreciation);
    
    setCategory(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        appreciations: prev.appreciations.map(app =>
          app.id === updatedAppreciation.id ? updatedAppreciation : app
        )
      };
    });
  };

  const handleDelete = (appreciationId: string) => {
    deleteAppreciation(category.id, appreciationId);
    
    setCategory(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        appreciations: prev.appreciations.filter(app => app.id !== appreciationId)
      };
    });
  };

  const handleToggleFavorite = (appreciationId: string, isFavorite: boolean) => {
    toggleFavorite(category.id, appreciationId, isFavorite);
    
    setCategory(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        appreciations: prev.appreciations.map(app =>
          app.id === appreciationId 
            ? { ...app, isFavorite } 
            : app
        )
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-4xl">{category.image}</span>
        <h1 className="text-3xl font-semibold">{category.name}</h1>
      </div>

      <AppreciationList 
        appreciations={category.appreciations} 
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}