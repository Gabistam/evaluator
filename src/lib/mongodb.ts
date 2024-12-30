import mongoose from 'mongoose';
const MONGODB_URI=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;


if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

let clientPromise: Promise<mongoose.Connection>;

if (process.env.NODE_ENV === 'development') {
  // En développement, utilisez une variable globale pour que la connexion persiste
  const globalWithMongoose = global as typeof globalThis & {
    mongoose: Promise<mongoose.Connection>;
  };
  if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = mongoose.connect(MONGODB_URI)
      .then(mongoose => mongoose.connection);
  }
  clientPromise = globalWithMongoose.mongoose;
} else {
  // En production, créez une nouvelle connexion
  clientPromise = mongoose.connect(MONGODB_URI)
    .then(mongoose => mongoose.connection);
}

export { clientPromise };