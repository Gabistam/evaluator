"use client";

import { useAuth } from "@/hooks/use-auth";
import { Category, Appreciation } from "@/types";
import { useState } from "react";
import { CategoryForm } from "@/components/features/admin/category-form";
import { AppreciationManager } from "@/components/features/admin/appreciation-manager";
import { Modal } from "@/components/ui/modal";
import { getCategories } from "@/lib/data";

export default function AdminPage() {
  const { isAdmin, isLoading } = useAuth('admin');
  const [categories, setCategories] = useState<Category[]>(getCategories());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  const handleAddCategory = (data: Partial<Category>) => {
    const newCategory: Category = {
      id: `cat_${Date.now()}`,
      name: data.name!,
      image: data.image!,
      description: data.description!,
      appreciations: []
    };

    setCategories(prev => [...prev, newCategory]);
    setIsAddModalOpen(false);
  };

  const handleUpdateCategory = (data: Partial<Category>) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === editingCategory?.id
          ? { ...cat, ...data }
          : cat
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const handleAddAppreciation = (categoryId: string, data: Partial<Appreciation>) => {
    const newAppreciation: Appreciation = {
      id: `app_${Date.now()}`,
      level: data.level!,
      comment: data.comment!
    };

    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, appreciations: [...cat.appreciations, newAppreciation] }
          : cat
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Administration</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Ajouter une catégorie
        </button>
      </div>

      <div className="space-y-6">
        {categories.map(category => (
          <div
            key={category.id}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.image}</span>
                <div>
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingCategory(category)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-900"
                >
                  Éditer
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="px-3 py-1 text-red-600 hover:text-red-900"
                >
                  Supprimer
                </button>
              </div>
            </div>

            <AppreciationManager
              category={category}
              onAdd={(data) => handleAddAppreciation(category.id, data)}
            />
          </div>
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter une catégorie"
      >
        <CategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Modifier la catégorie"
      >
        {editingCategory && (
          <CategoryForm
            category={editingCategory}
            onSubmit={handleUpdateCategory}
            onCancel={() => setEditingCategory(null)}
          />
        )}
      </Modal>
    </div>
  );
}