const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
    set: function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1); // Capitalizing first letter
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+/, "Please enter a valid email address"], // Email validation
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6, // Ensuring password is at least 6 characters long
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], // Basic phone validation
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    enum: ["admin", "user", "doctor"], // Enum to restrict type values
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
  isdoctor: {
    type: Boolean,
    default: false,
  },
});

// Hash the password before saving
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const userSchema = mongoose.model("user", userModel);

module.exports = userSchema;
