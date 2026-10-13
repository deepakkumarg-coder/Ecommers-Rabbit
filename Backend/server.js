const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Mongodb Path

const connectDB = require("./config/db");

// Api Router files

const userRoute = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const cartRoute = require("./routes/cartRoutes");
const checkoutRoute = require("./routes/checkoutRoutes");
const orderRoute = require("./routes/orderRoutes");
const uploadRoute = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscriberRoutes");

// Admin Api Router Files

const adminUserRoute = require("./routes/adminRoutes");
const adminProductRoute = require("./routes/adminProductRoutes");
const adminOrderRoute = require("./routes/adminOrderRoutes");

// App inital configuration

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// Connection to mongodb

connectDB();

// Api Route Intialization

app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/subscribe", subscribeRoute);

// Admin Api Route Initilization

app.use("/admin/api/users", adminUserRoute);
app.use("/admin/api/products", adminProductRoute);
app.use("/admin/api/orders", adminOrderRoute);

// Backend server Listening configurations

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("THIS IS BACKEND SERVER RUNNING ON ", PORT);
});
