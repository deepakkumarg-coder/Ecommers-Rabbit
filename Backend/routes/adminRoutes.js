const express = require("express");
const User = require("../models/User");
const {
  authMiddleware,
  admin,
  validate,
} = require("../middleware/authMiddleware");
const router = express.Router();

//@router GET /admin/api/users
//@desc to get all the user for th admin page

router.get("/", authMiddleware, admin, async (req, res, next) => {
  try {
    const user = await User.find({});
    if (user?.length === 0 || !user)
      return res.status(404).json({ message: "No User Found" });
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//@router POST /admin/api/users
//@desc Allows the Admin to add the users

router.post("/", authMiddleware, admin, async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) res.status(404).json({ message: " User Already Exists" });

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });
    await user.save();
    return res.status(200).json({ message: "User Created Succesfully", user });
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//@route PUT /admin/api/users/:id\
//@desc Enables the Admin to update the user details

router.put("/:id", authMiddleware, admin, async (req, res, next) => {
  try {
    if (!req.body) {
      return res
        .status(404)
        .json({ message: "Request body property is required" });
    }
    for (item in req.body) {
      if (item === "name" || item === "email" || item === "role") {
        if (item === "name") {

        }
        if (typeof req.body[item] !== "string") {
          return res.status(404).json({
            message: `Invalid Field Type Actual Field :${item} Type : String \n Given Field : ${item} Type : ${typeof req.body[item]} `,
          });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Invalid File type It Should be name,email,role" });
      }
    }
    const { name, email, role } = req.body;
    const { id = "" } = req.params;
    if (!id || typeof id !== "string")
      return res.status(404).json({ message: "Id is required " });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    return res.status(201).json({ message: "User Updated Succesfully", user });
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//@route DELETE /admin/aapi/users
//@desc Delete a user based on Id

router.delete("/:id", authMiddleware, admin, async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    if (!id || typeof id !== "string")
      return res.status(404).json({ message: "Id is required " });
    const user = await User.findById(id);
    if (user) {
      await user.deleteOne();
      return res.status(200).json({ message: "User Deleted Successfully" });
    } else {
      return res.status(200).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
