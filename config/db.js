const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Create text indexes for search functionality
    const Car = mongoose.model('Car');
    await Car.collection.createIndex({
      title: 'text',
      description: 'text',
      'tags.car_type': 'text',
      'tags.company': 'text',
      'tags.dealer': 'text'
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;