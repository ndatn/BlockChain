const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://huy2002:8PwT9NDuSa23GySO@cluster0.maie2ng.mongodb.net/")
    console.log("connected to mongoDB")
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDb