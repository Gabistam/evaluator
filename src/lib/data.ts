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

// Fonction pour mettre à jour une appréciation
export const updateAppreciation = (
  categoryId: string,
  appreciationId: string,
  updatedAppreciation: Appreciation
): void => {
  const categoryIndex = data.categories.findIndex(cat => cat.id === categoryId)
  if (categoryIndex === -1) return

  const appreciationIndex = data.categories[categoryIndex].appreciations.findIndex(
    app => app.id === appreciationId
  )
  if (appreciationIndex === -1) return

  data.categories[categoryIndex].appreciations[appreciationIndex] = updatedAppreciation
}

export const deleteAppreciation = (
  categoryId: string,
  appreciationId: string
): void => {
  const categoryIndex = data.categories.findIndex(cat => cat.id === categoryId)
  if (categoryIndex === -1) return

  const appreciations = data.categories[categoryIndex].appreciations
  data.categories[categoryIndex].appreciations = appreciations.filter(
    app => app.id !== appreciationId
  )
}