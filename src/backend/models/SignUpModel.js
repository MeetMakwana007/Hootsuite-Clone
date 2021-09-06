const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const signupTemplate = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//Generating token
signupTemplate.methods.generateAuthToken = async function () {
  const user = this;
  const payload = {
    user: {
      id: user.id.toString(),
    },
  };
  const token = jwt.sign(payload, "pqrs");
  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

const usermodel = mongoose.model("mytable", signupTemplate);

module.exports = usermodel;
