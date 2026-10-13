const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

// connect mongodb

mongoose.connect(process.env.MONGODB_URI);

const seeder = async (req, res, next) => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // create user
    const createUser = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "adminpass",
      role: "admin",
    });
    if (!createUser) {
      console.log("User Created succesfully");
    }
    const id = createUser._id;
    const product = products.map((product) => ({
      ...product,
      user: id,
    }));
    const createProduct = await Product.insertMany(product);
    console.log("Product Created succesfully");
    process.exit();
  } catch (error) {
    console.log("Error", error.message);
    process.exit();
  }
};
seeder();
