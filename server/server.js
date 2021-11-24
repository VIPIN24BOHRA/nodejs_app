// importing all the modules to be used in this api.

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("./models/UserModel");
const auth = require("./middleware/auth_middleware");
// creating express sever
const app = express();

// using the middleware for the api.
app.use(express.json()); // middleware to parse all the comming json data to object;
app.use(cors());

// connecting to the mongodb server.

mongoose.connect(
  " mongodb://127.0.0.1:27017/nodejs_app",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("dataBase connected");
  }
);

// route to register user.
app.post("/api/register", async (req, res) => {
  const new_user = new userModel(req.body);

  try {
    await new_user.save();
    res.status(201).send(new_user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// route to login.

// to login you would like to create token if user gets verified
// and that token will be send in the response so that it will stored in the browser
// for particular session and user can access the routes that is only available for verified user.
// for handling token we will use JsonWebToken module .

app.post("/api/login", async (req, res) => {
  try {
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = user.generateJWT();

    res.send({ token, user });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Routes that requires the token for verifying the user.

app.get("/api/me", auth, (req, res) => {
  res.send(req.user);
});

// server to listen the portnumber and the code to be execute after server gets start.

app.listen(8000, (err) => {
  if (err) console.log(err);
  else console.log("server connected");
});
