import { getCategory } from "@/lib/data";
import { CategoryView } from "@/components/features/categories/category-view";
import { notFound } from "next/navigation";

export default function CategoryPage({ 
  params 
}: { 
  params: { categoryId: string } 
}) {
  const category = getCategory(params.categoryId);

  if (!category) {
    notFound();
  }

  return <CategoryView initialCategory={category} />;
}