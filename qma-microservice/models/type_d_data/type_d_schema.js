const mongoose = require("mongoose");

const type_d_schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

type_d_schema.index({"geolocation": "2dsphere"});

module.exports = mongoose.model('TypeD', type_d_schema, "type_d_data");