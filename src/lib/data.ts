import { Category, Appreciation, FavoriteAppreciation, Database } from '@/types'
import dataRaw from '@/data/initial-data.json'

const data = dataRaw as Database;



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



// On passe seulement les champs que l'on veut modifier.
export const updateAppreciation = (
  categoryId: string,
  appreciationId: string,
  updatedFields: Partial<Appreciation>
): void => {
  const categoryIndex = data.categories.findIndex(cat => cat.id === categoryId);
  if (categoryIndex === -1) return;

  const appreciationIndex = data.categories[categoryIndex].appreciations.findIndex(
    app => app.id === appreciationId
  );
  if (appreciationIndex === -1) return;

  const currentAppreciation = data.categories[categoryIndex].appreciations[appreciationIndex];

  // Fusion sélective : on prend en base les champs actuels
  // et on écrase uniquement ceux qui sont présents dans updatedFields.
  data.categories[categoryIndex].appreciations[appreciationIndex] = {
    ...currentAppreciation,
    ...updatedFields,
    // On préserve la logique pour isFavorite :
    //  - si updatedFields.isFavorite est défini, on l’utilise
    //  - sinon, on garde currentAppreciation.isFavorite
    //  - sinon, par défaut false
    isFavorite: updatedFields.isFavorite ?? currentAppreciation.isFavorite ?? false,
  } satisfies Appreciation;
};

export const toggleFavorite = (
  categoryId: string,
  appreciationId: string,
  isFavorite: boolean,
  userId: string
): void => {
  const categoryIndex = data.categories.findIndex(cat => cat.id === categoryId);
  if (categoryIndex === -1) return;

  const appreciationIndex = data.categories[categoryIndex].appreciations.findIndex(
    app => app.id === appreciationId
  );
  if (appreciationIndex === -1) return;

  const currentAppreciation = data.categories[categoryIndex].appreciations[appreciationIndex];

  data.categories[categoryIndex].appreciations[appreciationIndex] = {
    ...currentAppreciation,
    // On force la valeur de isFavorite
    isFavorite,
    // On affecte userId uniquement quand isFavorite = true
    userId: isFavorite ? userId : undefined,
  } satisfies Appreciation;
};

export const getFavoriteAppreciations = (userId: string): FavoriteAppreciation[] => {
  const favorites: FavoriteAppreciation[] = []
  
  data.categories.forEach(category => {
    const categoryFavorites = category.appreciations
      .filter(app => app.isFavorite === true && app.userId === userId) // Filtre par userId
      .map(app => ({
        ...app,
        categoryName: category.name,
        categoryImage: category.image
      })) as FavoriteAppreciation[]
    
    favorites.push(...categoryFavorites)
  })
  
  return favorites
}