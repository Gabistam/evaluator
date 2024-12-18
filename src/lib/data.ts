import { Category, Appreciation } from '@/types'
import data from '@/data/initial-data.json'

export const getCategories = (): Category[] => {
  return data.categories
}

export const getCategory = (id: string): Category | undefined => {
  return data.categories.find(category => category.id === id)
}

export const getAppreciations = (categoryId: string): Appreciation[] => {
  const category = getCategory(categoryId)
  return category?.appreciations || []
}

export const getAppreciation = (categoryId: string, appreciationId: string): Appreciation | undefined => {
  const appreciations = getAppreciations(categoryId)
  return appreciations.find(appreciation => appreciation.id === appreciationId)
}