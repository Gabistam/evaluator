import mongoose from 'mongoose';

// Schéma Appreciation
const AppreciationSchema = new mongoose.Schema({
  id: String,
  level: String,
  comment: String,
  isFavorite: { type: Boolean, default: false },
  userId: { type: String, default: null }
}, { _id: false });

// Schéma Category
const CategorySchema = new mongoose.Schema({
  id: String,
  name: String,
  image: String,
  appreciations: [AppreciationSchema]
}, { 
  _id: false
});

// Schéma principal
const MainSchema = new mongoose.Schema({
  _id: String,
  categories: [CategorySchema]
}, {
  _id: false  // On désactive l'_id auto car on veut utiliser notre propre _id
});

// Export des modèles
export const MainModel = mongoose.models.Main || mongoose.model('Main', MainSchema);