const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRETE_KEY);
      req.user = await User.findById(decode.user.id).select("-password");
      next();
    } catch (error) {
      res.status(500).json({ message: " Not Authorized Token Failed" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Not Authorized Token Not Provided" });
  }
};

const admin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(400).json({ message: "Unauthorized User" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validate = (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      size,
      color,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimension,
      weight,
    } = req.body;

    // -------------------------
    // 1 Required string fields
    // -------------------------

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Product name is required",
      });
    }
    // 2 Description
    if (
      !description ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        message: "Product description is required",
      });
    }
    // 3 sku

    if (!sku || typeof sku !== "string" || !sku.trim()) {
      return res.status(400).json({
        message: "SKU is required",
      });
    }
    // 4 category

    if (!category || typeof category !== "string" || !category.trim()) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    if (
      !collections ||
      typeof collections !== "string" ||
      !collections.trim()
    ) {
      return res.status(400).json({
        message: "Collection is required",
      });
    }

    // -------------------------
    // 5 Price
    // -------------------------

    if (price === undefined || price === null) {
      return res.status(400).json({
        message: "Price is required",
      });
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({
        message: "Price must be a positive number",
      });
    }

    // -------------------------
    // 6 Discount price
    // -------------------------

    if (
      discountPrice !== undefined &&
      (typeof discountPrice !== "number" || discountPrice < 0)
    ) {
      return res.status(400).json({
        message: "Discount price must be a valid number",
      });
    }

    if (discountPrice !== undefined && discountPrice > price) {
      return res.status(400).json({
        message: "Discount price cannot be greater than price",
      });
    }

    // -------------------------
    // 7 Stock
    // -------------------------

    if (countInStock === undefined || countInStock === null) {
      return res.status(400).json({
        message: "Count in stock is required",
      });
    }

    if (!Number.isInteger(countInStock) || countInStock < 0) {
      return res.status(400).json({
        message: "Count in stock must be a non-negative integer",
      });
    }

    // -------------------------
    //8  Size
    // -------------------------

    if (!Array.isArray(size) || size.length === 0) {
      return res.status(400).json({
        message: "At least one size is required",
      });
    }

    if (size.some((item) => typeof item !== "string" || !item.trim())) {
      return res.status(400).json({
        message: "Every size must be a valid string",
      });
    }

    // 9  Tags

    if (!Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({
        message: "At least one tags is required",
      });
    }

    if (tags.some((item) => typeof item !== "string" || !item.trim())) {
      return res.status(400).json({
        message: "Every tags must be a valid string",
      });
    }

    // -------------------------
    // 10  Color
    // -------------------------

    if (!Array.isArray(color) || color.length === 0) {
      return res.status(400).json({
        message: "At least one color is required",
      });
    }

    if (color.some((item) => typeof item !== "string" || !item.trim())) {
      return res.status(400).json({
        message: "Every color must be a valid string",
      });
    }

    // -------------------------
    // 11  Gender
    // -------------------------

    if (gender !== undefined && !["Men", "Women", "Unisex"].includes(gender)) {
      return res.status(400).json({
        message: "Gender must be Men, Women, or Unisex",
      });
    }

    // -------------------------
    // 12  Images
    // -------------------------

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }

    for (const image of images) {
      if (!image.url || typeof image.url !== "string") {
        return res.status(400).json({
          message: "Each image must have a valid URL",
        });
      }

      if (!image.altText || typeof image.altText !== "string") {
        return res.status(400).json({
          message: "Each image must have altText",
        });
      }
    }

    // -------------------------
    // 13 Optional boolean fields
    // -------------------------

    if (isFeatured !== undefined && typeof isFeatured !== "boolean") {
      return res.status(400).json({
        message: "isFeatured must be true or false",
      });
    }
    // 14 ispublished

    if (isPublished !== undefined && typeof isPublished !== "boolean") {
      return res.status(400).json({
        message: "isPublished must be true or false",
      });
    }

    // 14 Dimensions

    if (!dimension || typeof dimension !== "object") {
      return res.status(400).json({
        message: "Dimension is required",
      });
    }
    for (item in dimension) {
      if (
        !dimension[item] ||
        typeof dimension[item] != "number" ||
        dimension[item] < 0
      ) {
        return res.status(400).json({
          message: "Invalid dimension Properties",
        });
      }
    }

      // 15 material

      if (!material || typeof material !== "string" || !material.trim()) {
        return res.status(400).json({
          message: "Material is required",
        });
      }
      // 16 brand

      if (!brand || typeof brand !== "string" || !material.trim()) {
        return res.status(400).json({
          message: "Brand is required",
        });
      }
      // 17 weight
      if (!weight) {
        return res.status(400).json({
          message: "Weight is required",
        });
      }

      if (typeof weight !== "number" || weight < 0) {
        return res.status(400).json({
          message: "weight must be a positive number",
        });
      }
      next();
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { authMiddleware, admin, validate };
