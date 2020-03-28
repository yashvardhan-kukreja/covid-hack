const mongoose = require("mongoose")

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    aadhar: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        geolocation: {
            type: {type: String},
            coordinates: [ {type: Number} ]             //longitude, then latitude
        },
        text: {
            type: String
        },
        pincode: {
            type: String
        }
    },
    password_pin: {
        type: String,
        required: String
    }
});

user_schema.index({"address.geolocation": "2dsphere"})

module.exports = mongoose.model('User', user_schema, "users")