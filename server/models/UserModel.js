const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: [true, "email is already in use"],
    required: [true, "email is required"],
  },
  phone: String,
  password: String,
  address: String,
});

// hashing the password before saving the password to database
// using pre_save middleware.
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  // verifying the user password.
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.methods.generateJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "this@is#node_js*app");
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  return userObject;
};
const userModel = new mongoose.model("users", userSchema);
module.exports = userModel;
