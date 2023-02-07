const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnect");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Running on Port: ${port}`);
});
