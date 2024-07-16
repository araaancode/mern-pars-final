
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const House = require('./models/House');
const houses = require("./data/houses")

const connectDB = require('./config/db');

dotenv.config()

connectDB()

// import data => node importData.js -i
const importData = async () => {
  try {
    await House.deleteMany()

    // import houses
    const sampleHouses = houses.map((house) => {
      return { ...house }
    })

    await House.insertMany(sampleHouses)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// delete data => node importData.js -d
const destroyData = async () => {
  try {
    // await Bus.deleteMany()
    await House.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}