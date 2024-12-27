"use client";

import { AppreciationList } from "@/components/features/appreciations/appreciation-list";
import { getFavoriteAppreciations, updateAppreciation, deleteAppreciation, toggleFavorite } from "@/lib/data";
import { useEffect, useState } from "react";
import { Appreciation } from "@/types";

interface FavoriteApreciation extends Appreciation {
  categoryName: string;
  categoryImage: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteApreciation[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const userId = "userId"; // Replace with actual userId
    setFavorites(getFavoriteAppreciations(userId));
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="space-y-6 opacity-0">
        <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  const handleUpdate = (updatedAppreciation: Appreciation) => {
    updateAppreciation("", updatedAppreciation.id, updatedAppreciation);
    setFavorites(prev => 
      prev.map(app => 
        app.id === updatedAppreciation.id 
          ? { ...updatedAppreciation, categoryName: app.categoryName, categoryImage: app.categoryImage }
          : app
      )
    );
  };

  const handleDelete = (appreciationId: string) => {
    deleteAppreciation("", appreciationId);
    setFavorites(prev => prev.filter(app => app.id !== appreciationId));
  };

  const handleToggleFavorite = (appreciationId: string, isFavorite: boolean) => {
    if (!isFavorite) {
      // Si on retire des favoris, on retire de la liste
      setFavorites(prev => prev.filter(app => app.id !== appreciationId));
    }
    toggleFavorite("", appreciationId, isFavorite, "userId");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Mes Favoris</h1>
        <p className="text-gray-600">
          {favorites.length} appréciation{favorites.length > 1 ? 's' : ''} favorite{favorites.length > 1 ? 's' : ''}
        </p>
      </div>

      {favorites.length > 0 ? (
        <AppreciationList 
          appreciations={favorites}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
          showCategory
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune appréciation favorite pour le moment.</p>
        </div>
      )}
    </div>
  );
}