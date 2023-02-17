const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnect");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const stripeRouter = require("./routes/stripeRouter");
const cookieParser = require("cookie-parser");
const { urlencoded } = require("express");
dotenv.config();

const app = express();
connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Running on Port: ${port}`);
});
