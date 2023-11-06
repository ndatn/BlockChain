const { Router } = require("express")
const data = require("../build/contracts/Book.json")

const router = Router();

router.get("/contract/book", (req, res) => {
    res.json(data)
})

module.exports = router