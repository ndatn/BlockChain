const express = require("express")
const bookRouter = require("./routes/comic.route")
const contractRouter = require("./routes/contract.route")
const transactionRouter = require("./routes/transaction.route")
const pokemonRouter = require("./routes/pokemon.route")
const cors = require("cors")
const connectDb = require("./database/mongo")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.raw())
app.use(cors())
app.use(express.static("public"))

connectDb()

app.use(bookRouter)
app.use(contractRouter)
app.use(transactionRouter)
app.use(pokemonRouter)

app.listen(8200, () => console.log("server has been init-ed at port 8200"))