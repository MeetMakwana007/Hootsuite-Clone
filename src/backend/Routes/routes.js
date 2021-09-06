const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const usermodel = require("../models/SignUpModel");

// Middleware
const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("Authenticate first [no jwt found]");
    }
    const decoded = jwt.verify(token, "pqrs");
    const user = await usermodel.findOne({
      _id: decoded.user.id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Not registred/Authenticate first");
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    // console.log(error);
    res.status(401).send("Authentication error");
  }
  // console.log("request data: ", req.header);
  // const token = req.header("x-auth-token");
  // if (token) {
  //   const isVerify = jwt.verify(token, "pqrs");
  //   if (isVerify) {
  //     req.token = token;
  //     req.user = user;
  //     console.log("verify: ", isVerify);
  //     return next();
  //   } else res.send("error in condition auth");
  // } else console.log("error in auth");
};

router.get("/api/auth", authentication, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

router.post("/signup", async (req, res) => {
  const userData = new usermodel(req.body);
  const token = await userData.generateAuthToken();
  userData["tokens"].push({ token: token });
  try {
    await userData.save();
  } catch (err) {
    console.log(err);
  }
  res.send(userData);
});

// router.use(authentication);

router.get("/check-auth", authentication, async (req, res) => {
  res.send("token verified successfully");
});

router.post("/login", async (req, res) => {
  // await usermodel.findOne({email:req.body.email,password:req.body.password},(err, response)=> {
  try {
    // console.log("Login Email", req.body, req.body.email);
    const user = await usermodel.findOne({ email: req.body.email });
    const tokenData = await user.generateAuthToken();
    user.save();
    res.status(200).send({ user, tokenData });
  } catch (err) {
    // console.log("Login API err", err);
    res.status(500).send();
  }
});

module.exports = router;
