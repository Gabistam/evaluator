import { UserFavorite } from '@/types'

// Simule une base de données en mémoire pour les favoris des utilisateurs
const userFavorites: UserFavorite[] = []

export const getUserFavorites = (userId: string): UserFavorite[] => {
  return userFavorites.filter(favorite => favorite.userId === userId)
}

export const isAppreciationFavorite = (
  userId: string,
  appreciationId: string
): boolean => {
  return userFavorites.some(
    favorite => 
      favorite.userId === userId && 
      favorite.appreciationId === appreciationId
  )
}

export const addFavorite = (
  userId: string,
  categoryId: string,
  appreciationId: string
): void => {
  if (!isAppreciationFavorite(userId, appreciationId)) {
    userFavorites.push({
      userId,
      categoryId,
      appreciationId
    })
  }
}

export const removeFavorite = (
  userId: string,
  appreciationId: string
): void => {
  const index = userFavorites.findIndex(
    favorite => 
      favorite.userId === userId && 
      favorite.appreciationId === appreciationId
  )
  if (index !== -1) {
    userFavorites.splice(index, 1)
  }
}