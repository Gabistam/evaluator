"use client";

import { Category, Appreciation } from "@/types";
import { AppreciationList } from "@/components/features/appreciations/appreciation-list";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { updateAppreciation, deleteAppreciation } from "@/lib/data";

interface CategoryViewProps {
  initialCategory: Category;
}

export function CategoryView({ initialCategory }: CategoryViewProps) {
  const [category, setCategory] = useState(initialCategory);

  const handleUpdate = (updatedAppreciation: Appreciation) => {
    updateAppreciation(category.id, updatedAppreciation.id, updatedAppreciation);
    
    setCategory(prev => ({
      ...prev,
      appreciations: prev.appreciations.map(app =>
        app.id === updatedAppreciation.id ? updatedAppreciation : app
      )
    }));
  };

  const handleDelete = (appreciationId: string) => {
    deleteAppreciation(category.id, appreciationId);
    
    setCategory(prev => ({
      ...prev,
      appreciations: prev.appreciations.filter(app => app.id !== appreciationId)
    }));
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
      />
    </div>
  );
}