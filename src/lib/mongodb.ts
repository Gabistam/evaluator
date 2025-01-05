import mongoose from 'mongoose';

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_CLUSTER || !process.env.DB_DATABASE) {
  throw new Error('Variables d\'environnement MongoDB manquantes');
}

let clientPromise: Promise<mongoose.Connection>;

async function connect() {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log('Connexion à MongoDB réussie');
    return connection.connection;
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
}

if (process.env.NODE_ENV === 'development') {
  // En développement, utilisez une variable globale pour que la connexion persiste
  const globalWithMongoose = global as typeof globalThis & {
    mongoose: Promise<mongoose.Connection>;
  };

  if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = connect();
  }
  clientPromise = globalWithMongoose.mongoose;
} else {
  // En production, créez une nouvelle connexion
  clientPromise = connect();
}

// Pour éviter les avertissements dans la console
mongoose.set('strictQuery', true);

// Ajout d'une fonction de connexion explicite
export async function connectDB() {
  try {
    await clientPromise;
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB:', error);
    process.exit(1);
  }
}

export { clientPromise };