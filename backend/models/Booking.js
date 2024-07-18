const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'Owner',
        required: true,
        unique: true,
    },
    house: {
        type: mongoose.Schema.ObjectId,
        ref: 'House',
        required: true,
        unique: true,
    },
    price: {
        type: Number,
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    guests:{
        type: Number,
        default: 0
    },
  
},{ timestamps: true });


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;