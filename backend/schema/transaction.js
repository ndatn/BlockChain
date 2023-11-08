const mongoose = require("mongoose")

const { Schema } = mongoose

const transactionModel = mongoose.model("transaction", new Schema({
  transactionHash: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  amount: {
    type: String,
    require: true
  }
}))

module.exports = transactionModel