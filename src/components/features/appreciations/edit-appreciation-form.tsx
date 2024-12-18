"use client";

import { Appreciation } from "@/types";
import { useState } from "react";

interface EditAppreciationFormProps {
  appreciation: Appreciation;
  onSubmit: (updatedAppreciation: Appreciation) => void;
  onCancel: () => void;
}

export function EditAppreciationForm({ 
  appreciation, 
  onSubmit, 
  onCancel 
}: EditAppreciationFormProps) {
  const [comment, setComment] = useState(appreciation.comment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...appreciation,
      comment: comment.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="comment" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Commentaire
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full min-h-[120px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Saisissez votre commentaire..."
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}