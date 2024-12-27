"use client";

import { Category } from "@/types";
import Link from "next/link";

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl" role="img" aria-label={category.name}>
                {category.image}
              </span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {category.appreciations.length} niveaux d&apos;évaluation
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}