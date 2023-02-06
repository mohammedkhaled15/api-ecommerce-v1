const express = require("express");
const connectDB = require("./config/dbConn");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`Server is Running at ${port}`);
});
