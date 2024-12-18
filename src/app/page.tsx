import { getCategories } from '@/lib/data'
import { CategoryCard } from '@/components/features/categories/category-card'

export default function HomePage() {
  const categories = getCategories()

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Evaluator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </main>
  )
}