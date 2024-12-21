"use client";

import { Appreciation } from "@/types";
import { Copy, CheckCircle, Pencil, Trash2, Star } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { EditAppreciationForm } from "./edit-appreciation-form";

interface AppreciationCardProps {
  appreciation: Appreciation;
  onUpdate?: (updatedAppreciation: Appreciation) => void;
  onDelete?: (appreciationId: string) => void;
  onToggleFavorite?: (appreciationId: string, isFavorite: boolean) => void;
}

export function AppreciationCard({ 
  appreciation,
  onUpdate,
  onDelete,
  onToggleFavorite
}: AppreciationCardProps) {
  const [copied, setCopied] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(appreciation.comment);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const handleUpdate = (updatedAppreciation: Appreciation) => {
    onUpdate?.(updatedAppreciation);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    onDelete?.(appreciation.id);
    setIsDeleteModalOpen(false);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggleFavorite?.(appreciation.id, !appreciation.isFavorite);
  };

  return (
    <>
      <div className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
            {appreciation.level}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              onClick={handleToggleFavorite}
            >
              <Star 
                className={`w-5 h-5 ${
                  appreciation.isFavorite 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-400 group-hover:text-gray-600'
                }`}
              />
            </button>
            <button
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Pencil className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              onClick={handleCopy}
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>
        
        <p className="text-gray-700 font-geist-sans">
          {appreciation.comment}
        </p>

        {copied && (
          <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Copié !
          </div>
        )}
      </div>

      <Modal
        title="Confirmer la suppression"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer cette appréciation ? Cette action est irréversible.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            >
              Supprimer
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Modifier l'appréciation"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <EditAppreciationForm
          appreciation={appreciation}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </>
  );
}