const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const {
  authMiddleware,
  admin,
  validate,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Helper function to get the cart for loggedin user and guest user

const getcart = async (user, guestId) => {
  try {
    if (user) {
      return await Cart.findOne({ user });
    } else if (guestId) {
      return await Cart.findOne({ guestId });
    }
    return null;
  } catch (error) {
    console.log("this is delete cart error",error)
    return error;
  }
};

//@route POST api/cart
//@desc Add product to the cart for logged in user and guestuser

router.post("/", async (req, res, next) => {
  try {
    const { productId, quantity, size, color, userId, guestId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product Not Found" });
    let cart = await getcart(userId, guestId);
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color,
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // Re Calculate Total Price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      return res.status(201).json(cart);
    } else {
      // Create a new cart for guest user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(200).json(newCart);
    }
  } catch (error) {
    console.log("Error Message : ", error);
    return res.status(500).json({ message: error.message });
  }
});

//@router PUT /api/cart
//@desc To update the cart for the guest user or loggedin user

router.put("/", async (req, res, next) => {
  try {
    const { productId, guestId, userId, color, size, quantity } = req.body;
    const cart = await getcart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart Not Founnd" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );
    if (productIndex > -1) {
      if (Number(quantity) > 0) {
        cart.products[productIndex].quantity = Number(quantity);
      } else {
        cart.products.splice(productId, 1);
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      return res.status(201).json(cart);
    } else {
      return res.status(404).json({ message: "Product Not Found In Cart" });
    }
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//@router Delete /api/cart
//@desc To Delete a product from the cart for the guest user or loggedin user

router.delete("/", async (req, res, next) => {
  try {
    const { productId, guestId, userId, color, size } = req.body;
    const cart = await getcart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart Not Founnd" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );
    if (productIndex > -1) {
      cart.products.splice(productId, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      return res.status(201).json(cart);
    } else {
      return res.status(404).json({ message: "Product Not Found In Cart" });
    }
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//@router GET /api/cart

router.get("/", async (req, res, next) => {
  try {
    const { userId, guestId } = req.query;
    const cart = await getcart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart Not Found" });
    return res.status(200).json(cart);
  } catch (error) {
    console.log("Error Message", error.message);
    return res.status(500).json({ message: error.message });
  }
});

//@route POST api/cart/merge
//@desc To merge the guest user and loggedin user carts

router.post("/merge", authMiddleware, async (req, res, next) => {
  try {
    const { guestId } = req.body;
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length == 0)
        return res.status(400).json({ message: "Guest Card is empty" });
      if (userCart) {
        guestCart.products.forEach((guestitem) => {
          const guestCardIndex = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === guestitem.productId.toString() &&
              p.size === guestitem.size &&
              p.color === guestitem.color,
          );
          if (guestCardIndex > -1) {
            userCart.products[guestCardIndex].quantity += guestitem.quantity;
          } else {
            userCart.products.push(guestitem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
        await userCart.save();
        // Remove the Guest User
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.log("Error in Deleting Guest user", error.message);
        }
        res.status(200).json(userCart);
      } else {
        // if the guest cart has no user cart
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart);
      }
      return res.status(404).json({ message: "User Cart Not Found" });
    }
  } catch (error) {
    console.log("Error Message", error.message);
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
