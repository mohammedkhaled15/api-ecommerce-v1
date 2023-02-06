const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected Successfully to DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
