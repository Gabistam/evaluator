"use client";

import { Appreciation, Category } from "@/types";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { AppreciationList } from "../appreciations/appreciation-list";

interface AppreciationManagerProps {
  category: Category;
  onAdd: (appreciation: Partial<Appreciation>) => void;
}

export function AppreciationManager({ category, onAdd }: AppreciationManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [level, setLevel] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      level: level.trim(),
      comment: comment.trim(),
    });
    setLevel("");
    setComment("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Appréciations</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 text-sm text-blue-500 hover:text-blue-600"
          >
            Ajouter une appréciation
          </button>
        </div>

        <AppreciationList
          appreciations={category.appreciations}
          readOnly
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter une appréciation"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Niveau
            </label>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commentaire
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}