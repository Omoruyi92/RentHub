import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error("❌ MONGODB_URI is undefined. Please check your .env file.");
      process.exit(1); // Exit with error
    }

    await mongoose.connect(uri);
    const connection = mongoose.connection;

    if (connection.listeners('connected').length === 0) {
      connection.on('connected', () => {
        console.log('✅ MongoDB connected successfully');
      });
    }

    connection.on('error', (err) => {
      console.error('❌ MongoDB connection error. Make sure MongoDB is running.\n', err);
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

export default dbConnect;
