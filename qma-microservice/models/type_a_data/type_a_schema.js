const mongoose = require("mongoose");

const type_a_schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image_base64: {
        type: String,
        required: true
    },
    geolocation: {
        type: {type: String},
        coordinates: [{type: Number}]       //longitude, then latitude
    },
    timestamp: {
        type: Number,
        default: Date.now()
    }
});

type_a_schema.index({"geolocation": "2dsphere"});

module.exports = mongoose.model('TypeA', type_a_schema, "type_a_data");