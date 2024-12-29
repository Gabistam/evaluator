import { Appreciation } from "@/types";
import { AppreciationCard } from "./appreciation-card";

// Ajout de la prop readOnly
interface AppreciationListProps {
  appreciations: (Appreciation & { categoryName?: string; categoryImage?: string })[];
  onUpdate?: (updatedAppreciation: Appreciation) => void;
  onDelete?: (appreciationId: string) => void;
  onToggleFavorite?: (appreciationId: string, isFavorite: boolean) => void;
  showCategory?: boolean;
  readOnly?: boolean;
}


export function AppreciationList({ 
  appreciations, 
  onUpdate,
  onDelete,
  onToggleFavorite,
  showCategory,
}: AppreciationListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {appreciations.map((appreciation) => (
        <div key={appreciation.id} className="space-y-2">
          {showCategory && appreciation.categoryName && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{appreciation.categoryImage}</span>
              <span>{appreciation.categoryName}</span>
            </div>
          )}
          <AppreciationCard 
            appreciation={appreciation}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
            // Si vous voulez éventuellement passer readOnly à AppreciationCard
          />
        </div>
      ))}
    </div>
  );
}
