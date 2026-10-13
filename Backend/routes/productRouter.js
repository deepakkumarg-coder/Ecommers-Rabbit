const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const {
  authMiddleware,
  admin,
  validate,
} = require("../middleware/authMiddleware");
const router = express.Router();

//@router Post /api/product
//@desc to create a new product
router.post("/", authMiddleware, admin, validate, async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      size,
      color,
      material,
      collections,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimension,
      weight,
      sku,
    } = req.body;
    let product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      size,
      color,
      material,
      collections,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimension,
      weight,
      sku,
      user: req.user.id, //Stores the userid of the admin user
    });
    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//@router PUT /api/product/:id
//@desc to update the the product in database
router.put("/:id", authMiddleware, admin, async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      size,
      color,
      material,
      collections,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimension,
      weight,
      sku,
    } = req.body;
    const product = await Product.findById(id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.size = size || product.size;
      product.color = color || product.color;
      product.material = material || product.material;
      product.collections = collections || product.collections;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured != undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished != undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimension = dimension || product.dimension;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;
      const updatedProduct = await product.save();
      return res.status(200).json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.log("this is error",error,error.message)
    return res.status(400).json({ message: error.message });
  }
});

//@router DELETE /api/product/:id
//@desc To delete a product

router.delete("/:id", authMiddleware, admin, async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    return res.status(200).json({ message: "Product Deletd Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//@route GET api/product
//@desc To get the filtered Products using Query Paramater

router.get("/", async (req, res, next) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;
    let query = {};

    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collection = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (size) {
      query.size = { $in: size.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (color) {
      query.color = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort logic
    let sort = {};
    switch (sortBy) {
      case "priceAsc":
        sort = { price: 1 };
        break;
      case "priceDsc":
        sort = { price: -1 };
        break;
      case "popularity":
        sort = { rating: -1 };
        break;
      default:
        break;
    }

    // Fltered Product
    let product = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    if (!product) return re.status(404).json({ message: "Products Not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @router GET /api/product/best-seller
router.get("/best-seller", async (req, res, next) => {
  try {
    const product = await Product.findOne().sort({ rating: -1 });
    if (!product)
      return res.status(404).json({ message: "Product  Not Found" });
    return res.status(200).send(product);
  } catch (error) {
    console.log("Error Message : ", error);
    res.status(500).json({ message: error.message });
  }
});

//@route GET /api/product/new-arival
//@desc Get the latest 8 products

router.get("/new-arivals", async (req, res, next) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 }).limit(8);
    if (!product)
      return re.status(200).json({ message: "No Product Available" });
    return res.status(200).json(product);
  } catch (error) {
    console.log("Error message", error);
    return res.status(500).json({ message: error.message });
  }
});

//@route GET /api/product/single/:id
//@desc To get a single product

router.get("/single/:id", async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    if (!id)
      return res.status(404).json({ message: "ID Need to a Product ID" });
    let product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Product  Not Found" });
    return res.status(200).send(product);
  } catch (error) {
    console.log("Error Message : ", error);
    res.status(500).json({ message: error.message });
  }
});

//@route GET /api/product/similar/:id
//@desc To get a single product

router.get("/similar/:id", async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    if (!id)
      return res.status(404).json({ message: "ID Need to a Product ID" });
    let product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Product  Not Found" });
    let similarProduct = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);
    if (!similarProduct)
      return res.status(404).json({ message: "No Similar Product  Not Found" });
    return res.status(200).send(similarProduct);
  } catch (error) {
    console.log("Error Message : ", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
