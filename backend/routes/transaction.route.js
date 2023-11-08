const express = require("express")
const router = express.Router()
const transactionModel = require("../schema/transaction")

router.post("/transactions", async (req, res) => {
  const { transactionHash, senderId, amount } = req.body
  const transaction = new transactionModel({
    transactionHash,
    senderId,
    amount
  })
  await transaction.save()
  return res.json({ transactionHash })
})

router.get("/transactions", async (req, res) => {
  const result = await transactionModel.find({ senderId: req.query.senderId }).sort({ createdDate: -1 })
  return res.json(result)
})

router.delete("/transactions", async (req, res) => {
  const result = await transactionModel.deleteMany({})
  return res.json(result)
})

module.exports = router