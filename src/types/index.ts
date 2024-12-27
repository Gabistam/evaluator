export interface Appreciation {
  id: string;
  level: string;
  comment: string;
  isFavorite?: boolean;
  categoryId?: string;
  userId?: string | null;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  appreciations: Appreciation[];
}

export interface Database {
  _id: string;
  categories: Category[];
}

export interface FavoriteAppreciation extends Appreciation {
  categoryName: string;
  categoryImage: string;
}

export interface UserFavorite {
  userId: string;
  appreciationId: string;
  categoryId: string;
}