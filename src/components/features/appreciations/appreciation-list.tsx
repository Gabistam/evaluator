import { Appreciation } from "@/types";
import { AppreciationCard } from "./appreciation-card";

interface AppreciationListProps {
  appreciations: Appreciation[];
  onUpdate: (updatedAppreciation: Appreciation) => void;
  onDelete: (appreciationId: string) => void;
}

export function AppreciationList({ 
  appreciations, 
  onUpdate,
  onDelete
}: AppreciationListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {appreciations.map((appreciation) => (
        <AppreciationCard 
          key={appreciation.id} 
          appreciation={appreciation}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}