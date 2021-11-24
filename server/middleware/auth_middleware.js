const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");

    const decoded = jwt.verify(token, "this@is#node_js*app");
    const user = await userModel.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate" });
  }
};

module.exports = auth;
