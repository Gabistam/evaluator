import { Category, Appreciation, FavoriteAppreciation } from '@/types'
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

  // On s'assure que isFavorite est défini
  const currentAppreciation = data.categories[categoryIndex].appreciations[appreciationIndex]
  data.categories[categoryIndex].appreciations[appreciationIndex] = {
    ...updatedAppreciation,
    isFavorite: updatedAppreciation.isFavorite ?? currentAppreciation.isFavorite ?? false
  } satisfies Appreciation
}

export const toggleFavorite = (
  categoryId: string,
  appreciationId: string,
  isFavorite: boolean
): void => {
  const categoryIndex = data.categories.findIndex(cat => cat.id === categoryId)
  if (categoryIndex === -1) return

  const appreciationIndex = data.categories[categoryIndex].appreciations.findIndex(
    app => app.id === appreciationId
  )
  if (appreciationIndex === -1) return

  const currentAppreciation = data.categories[categoryIndex].appreciations[appreciationIndex]
  data.categories[categoryIndex].appreciations[appreciationIndex] = {
    ...currentAppreciation,
    isFavorite: isFavorite
  } satisfies Appreciation
}

export const getFavoriteAppreciations = (): FavoriteAppreciation[] => {
  const favorites: FavoriteAppreciation[] = []
  
  data.categories.forEach(category => {
    const categoryFavorites = category.appreciations
      .filter(app => app.isFavorite === true)
      .map(app => ({
        ...app,
        categoryName: category.name,
        categoryImage: category.image
      })) as FavoriteAppreciation[]
    
    favorites.push(...categoryFavorites)
  })
  
  return favorites
}