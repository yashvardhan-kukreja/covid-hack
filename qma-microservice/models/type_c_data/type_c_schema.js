const mongoose = require("mongoose");

const type_c_schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    normal_temp: {
        type: Boolean
    },
    text: {
        type: String
    },
    timestamp: {
        type: Number,
        default: Date.now()
    }
});

module.exports = mongoose.model('TypeC', type_c_schema, "type_c_data");