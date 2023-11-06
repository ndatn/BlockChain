const { Router } = require("express")
const data = require("../statics/books")

const router = Router();

router.get("/books", (req, res) => {
    res.json(data)
})

module.exports = router