const mongoose = require('mongoose')
const colors = require("colors")

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://localhost:27017/mernparsdb")

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB