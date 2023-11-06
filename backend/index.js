const express = require("express")
const bookRouter = require("./routes/comic.route")
const contractRouter = require("./routes/contract.route")
const cors = require("cors")
const { Web3 } = require("web3")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.raw())
app.use(cors())
app.use(express.static("public"))

app.use(bookRouter)
app.use(contractRouter)

const web3 = new Web3('http://localhost:8545');

// Define a route to fetch all transactions for a Ganache account
app.get('/transactions/:account', async (req, res) => {
  const { account } = req.params;
  try { 
    // Get the transaction count for the account to determine the range
    const transactionCount = await web3.eth.getTransactionCount(account.toString());

    // Fetch transactions for the given account
    const transactions = await Promise.all(
      Array(transactionCount)
        .fill()
        .map((_, index) => web3.eth.getTransactionFromBlock('latest', index))
    );

    res.json(transactions);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.listen(8200, () => console.log("server has been init-ed at port 8200"))