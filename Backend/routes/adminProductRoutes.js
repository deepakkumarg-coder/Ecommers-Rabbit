const express = require("express");
const Product = require("../models/Product");
const {
  authMiddleware,
  admin,
  validate,
} = require("../middleware/authMiddleware");
const router = express.Router();

//@route GET /admin/api/products
//@desc To get all the products from the database
router.get("/", authMiddleware, admin, async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res.status(404).json({ message: "No Products" });
    } else {
      return res.status(200).json(products);
    }
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//route /admin/api/products/
//@desc To update a Particular Product

router.put("/:id", authMiddleware, admin, async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    if (!id || typeof id !== "string")
      return res.status(404).json({ message: "Id is required " });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    const {
      name = "",
      description = "",
      price = 0,
      countInStock = 0,
      sku = "",
      category = "",
      brand = "",
      size = [],
      color = [],
      collections = "",
      material = "",
      images = [],
    } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;
    product.sku = sku || product.sku;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.size = size || product.size;
    product.color = color || product.color;
    product.collections = collections || product.collections;
    product.material = material || product.material;
    product.images = images || product.images;
    await product.save();
    return res.status(200).json({ message: "Product updated  Succesfully" });
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//route /admin/api/products
//@desc To Create a Particular Product

router.post("/", authMiddleware, admin, async (req, res, next) => {
  try {
    const {
      name = "",
      description = "",
      price = 0,
      countInStock = 0,
      sku = "",
      category = "",
      brand = "",
      size = [],
      color = [],
      collections = "",
      material = "",
      images = [],
    } = req.body;
    let product = new Product({
      name,
      description,
      price,
      countInStock,
      sku,
      category,
      brand,
      size,
      color,
      collections,
      material,
      images,
      user:req.user._id
    });
    await product.save();
    return res.status(200).json({ message: "Product Created  Succesfully" });
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//@router DELETE admin/api/products
//@desc To Delete a product from database

router.delete("/:id", authMiddleware, admin, async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    if (!id || typeof id !== "string")
      return res.status(404).json({ message: "Id is required " });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });
    await product.deleteOne();
    return res.status(200).json({ message: "Product Delete Succesfully" });
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//@router DELETE admin/api/products/image
//@desc To Delete a product from database

router.delete("/:id/image", authMiddleware, admin, async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    const { imageUrl = "" } = req.body;
    if (!id || typeof id !== "string")
      return res.status(404).json({ message: "Id is required " });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });
    const images = product.images.filter((img) => img.url != imageUrl);
    product.images = images;
    await product.save();
    return res
      .status(200)
      .json({ message: "Product Image Delete Succesfully" });
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
