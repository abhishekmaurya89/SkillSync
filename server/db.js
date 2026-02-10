import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ Database connected');
    });

    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDb;
