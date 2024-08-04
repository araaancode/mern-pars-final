const mongoose = require('mongoose')
const colors = require("colors")

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb+srv://araaancode:2fcmKqD47IJ8q2Q1@kome.sutbc0i.mongodb.net/")

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB