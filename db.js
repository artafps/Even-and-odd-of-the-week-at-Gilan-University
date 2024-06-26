const mongoose = require("mongoose");
const lg = console.log;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    lg(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    lg(err);
    process.exit(1);
  }
};

module.exports = connectDB;
