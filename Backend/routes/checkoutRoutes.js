const express = require("express");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Checkout = require("../models/Checkout");
const Order = require("../models/Order");
const {
  authMiddleware,
  admin,
  validate,
} = require("../middleware/authMiddleware");
const router = express.Router();

//@route POST api/checkout
//@desc Create a new checkout session

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
      req.body;
    if (!checkoutItems && checkoutItems?.length > 0) {
      return res.status(404).json({ message: "no items in the cart" });
    }
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    return res.status(200).json(newCheckout);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//@route PUT /api/:id/pay
//@desc After successful payment mark checkout as paid

router.put("/:id/pay", authMiddleware, async (req, res, next) => {
  try {
    const { paymentStatus, paymentDetails } = req.body;
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout)
      return res.status(404).json({ message: "Checkout not found" });
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      return res.status(200).json(checkout);
    } else {
      return res.status(404).json({ message: "Invalid PaymentStatus" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//@route POST /api/checkout/:id/finalize
//@desc finalize the checkout and convert them into a order after payment

router.post("/:id/finalize", authMiddleware, async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    const checkout = await Checkout.findById(id);
    if (!checkout)
      return res.status(404).json({ message: "Checkout Not Found" });
    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: req.user._id,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        paymentStatus: "paid",
        isDelivered: false,
      });
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      return res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      return res.status(404).json({ message: "Checkout Already Finalized" });
    } else {
      return res.status(404).json({ message: "Checkout is Not Paid" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
