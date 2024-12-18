import { getCategory } from "@/lib/data";
import { AppreciationList } from "@/components/features/appreciations/appreciation-list";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-4xl">{category.image}</span>
        <h1 className="text-3xl font-semibold">{category.name}</h1>
      </div>

      <AppreciationList appreciations={category.appreciations} />
    </div>
  );
}