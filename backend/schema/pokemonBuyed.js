const mongoose = require("mongoose")

const { Schema } = mongoose

const pokemonBuyedModel = mongoose.model("pokemon-buyed", new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        require: true
    },
    sprite: {
        type: String,
        require: true
    },
    transactionHash: {
        type: String,
        require: true
    },
    accountId: {
        type: String,
        require: true
    }
}))

module.exports = pokemonBuyedModel