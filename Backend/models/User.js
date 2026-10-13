const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true },
);

// Hashing the password before saving

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Matches the user Entered password with password

UserSchema.methods.matchPassword = async function (enterdPassword) {
  return bcrypt.compare(enterdPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
