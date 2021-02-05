const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const RegisterModel = mongoose.model("register", RegisterSchema);

module.exports = RegisterModel;
