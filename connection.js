import mongoose from 'mongoose';

async function connect() {
  try {
    mongoose.set('strictQuery', false);
    // Connect to MongoDB Atlas
    await mongoose.connect("mongodb://127.0.0.1:27017/studentdetails");
    console.log("Connected to MongoDB successfully");

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected successfully');
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connect;