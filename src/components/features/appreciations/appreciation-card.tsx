"use client";

import { Appreciation } from "@/types";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

interface AppreciationCardProps {
  appreciation: Appreciation;
}

export function AppreciationCard({ appreciation }: AppreciationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(appreciation.comment);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  return (
    <div 
      className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
      onClick={handleCopy}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
          {appreciation.level}
        </span>
        <button 
          className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
        >
          {copied ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
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
  );
}