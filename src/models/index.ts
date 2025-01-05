import mongoose, { Schema, Document } from 'mongoose';
import { connectDB } from '@/lib/mongodb';

// Interfaces pour le typage
interface IAppreciation {
  id: string;
  level: string;
  comment: string;
  isFavorite?: boolean;
  userId?: string | null;
}

interface ICategory {
  id: string;
  name: string;
  image: string;
  appreciations: IAppreciation[];
}

interface IMainDocument extends Document {
  _id: string;
  categories: ICategory[];
}

// Schéma Appreciation
const AppreciationSchema = new Schema<IAppreciation>({
  id: { type: String, required: true },
  level: { type: String, required: true },
  comment: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  userId: { type: String, default: null }
}, { _id: false });

// Schéma Category
const CategorySchema = new Schema<ICategory>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  appreciations: [AppreciationSchema]
}, { _id: false });

// Schéma principal
const MainSchema = new Schema<IMainDocument>({
  _id: { type: String, required: true },
  categories: [CategorySchema]
}, {
  _id: false,
  timestamps: false,
  collection: 'main' // Spécifie explicitement la collection
});

// Initialisation du modèle avec gestion des erreurs
let MainModel: mongoose.Model<IMainDocument>;

try {
  // Tente de récupérer un modèle existant
  MainModel = mongoose.model<IMainDocument>('Main');
} catch {
  // Crée le modèle s'il n'existe pas
  MainModel = mongoose.model<IMainDocument>('Main', MainSchema);
}

// Assure la connexion à MongoDB
connectDB().catch(console.error);

export { MainModel };