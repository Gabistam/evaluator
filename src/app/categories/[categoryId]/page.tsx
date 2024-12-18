import { getCategory } from "@/lib/data";
import { CategoryView } from "@/components/features/categories/category-view";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory(params.categoryId);

  if (!category) {
    notFound();
  }

  return <CategoryView initialCategory={category} />;
}