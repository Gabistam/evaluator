import { Category, Appreciation, FavoriteAppreciation } from '@/types';
import { MainModel } from '@/models';

import { connectDB } from './mongodb';

connectDB().then(() => console.log('Connexion à la base de données réussie')).catch(console.error);

export const getCategories = async (): Promise<Category[]> => {
  try {
    const result = await MainModel.findOne({ _id: 'evaluator_db_001' });
    return (result?.categories || []).map(category => ({
      ...category,
      description: category.description || ''
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return [];
  }
};

export const getCategory = async (id: string): Promise<Category | undefined> => {
  const result = await MainModel.findOne(
    { _id: 'evaluator_db_001', 'categories.id': id },
    { 'categories.$': 1 }
  );
  return result?.categories[0];
};

export const getAppreciations = async (categoryId: string): Promise<Appreciation[]> => {
  const category = await getCategory(categoryId);
  return category?.appreciations || [];
};

export const getAppreciation = async (
  categoryId: string,
  appreciationId: string
): Promise<Appreciation | undefined> => {
  const result = await MainModel.findOne(
    { 
      _id: 'evaluator_db_001',
      'categories.id': categoryId,
      'categories.appreciations.id': appreciationId 
    },
    { 'categories.$': 1 }
  );
  interface AppreciationWithId {
    id: string;
  }
  
  return result?.categories[0]?.appreciations
    .find((app: AppreciationWithId) => app.id === appreciationId);
};

export const deleteAppreciation = async (
  categoryId: string,
  appreciationId: string
): Promise<void> => {
  await MainModel.updateOne(
    { _id: 'evaluator_db_001', 'categories.id': categoryId },
    { 
      $pull: { 
        'categories.$.appreciations': { id: appreciationId } 
      } 
    }
  );
};

export const updateAppreciation = async (
  categoryId: string,
  appreciationId: string,
  updatedFields: Partial<Appreciation>
): Promise<void> => {
  const currentData = await getAppreciation(categoryId, appreciationId);
  if (!currentData) return;

  const updatedAppreciation = {
    ...currentData,
    ...updatedFields,
    isFavorite: updatedFields.isFavorite ?? currentData.isFavorite ?? false,
  };

  await MainModel.updateOne(
    { 
      _id: 'evaluator_db_001',
      'categories.id': categoryId,
      'categories.appreciations.id': appreciationId 
    },
    { 
      $set: { 
        'categories.$[category].appreciations.$[appreciation]': updatedAppreciation 
      } 
    },
    {
      arrayFilters: [
        { 'category.id': categoryId },
        { 'appreciation.id': appreciationId }
      ]
    }
  );
};

export const toggleFavorite = async (
  categoryId: string,
  appreciationId: string,
  isFavorite: boolean,
  userId: string
): Promise<void> => {
  const updateData = {
    isFavorite,
    userId: isFavorite ? userId : null
  };

  await MainModel.updateOne(
    { 
      _id: 'evaluator_db_001',
      'categories.id': categoryId,
      'categories.appreciations.id': appreciationId 
    },
    { 
      $set: { 
        'categories.$[category].appreciations.$[appreciation].isFavorite': isFavorite,
        'categories.$[category].appreciations.$[appreciation].userId': updateData.userId
      } 
    },
    {
      arrayFilters: [
        { 'category.id': categoryId },
        { 'appreciation.id': appreciationId }
      ]
    }
  );
};

export const getFavoriteAppreciations = async (userId: string): Promise<FavoriteAppreciation[]> => {
  const result = await MainModel.findOne({ _id: 'evaluator_db_001' });
  const favorites: FavoriteAppreciation[] = [];

  interface AppreciationWithCategory extends Appreciation {
    categoryName: string;
    categoryImage: string;
  }

  result?.categories.forEach((category: Category) => {
    const categoryFavorites: AppreciationWithCategory[] = category.appreciations
      .filter((app: Appreciation) => app.isFavorite === true && app.userId === userId)
      .map((app: Appreciation): AppreciationWithCategory => ({
        ...app,
        categoryName: category.name,
        categoryImage: category.image
      }));
    
    favorites.push(...categoryFavorites);
  });

  return favorites;
};