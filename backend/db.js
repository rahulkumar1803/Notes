const mongoose = require('mongoose');

require('dotenv').config()

const MD_URI = process.env.MONGO_URI;

const connectToMongo = () => {
    mongoose.connect(MD_URI)
    .then(() => {
        console.log('connected to Mongo succesfully')
    })
    .catch((error) => {
        console.log(error)
    })
}

module.exports = connectToMongo