const mongoose = require('mongoose');

const options = {
  serverSelectionTimeoutMS: 30000
};

const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed',error.message);
    process.exit(1);
  }
};
mongoose.set('debug', true);

module.exports = connectDB;

