import { Category } from "@/types";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl" role="img" aria-label={category.name}>
            {category.image}
          </span>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
            <p className="text-sm text-gray-500">
              {category.appreciations.length} niveaux d&rsquo;évaluation
            </p>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {category.appreciations.slice(0, 3).map((appreciation) => (
            <span
              key={appreciation.id}
              className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
            >
              {appreciation.level}
            </span>
          ))}
          {category.appreciations.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              +{category.appreciations.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}