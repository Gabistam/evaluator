import { Appreciation } from "@/types";
import { AppreciationCard } from "./appreciation-card";

interface AppreciationListProps {
  appreciations: Appreciation[];
}

export function AppreciationList({ appreciations }: AppreciationListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {appreciations.map((appreciation) => (
        <AppreciationCard 
          key={appreciation.id} 
          appreciation={appreciation}
        />
      ))}
    </div>
  );
}