const mongoose = require("mongoose");
var validator = require("validator");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your user name"],
  },

  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const transferSchema = new mongoose.Schema(
  {
    records: [
      {
        type: String,
      },
    ],
  },

  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
const Transfer = mongoose.model("Transfer", transferSchema);

module.exports ={
    Customer,
    Transfer
}
