const TypeD = require("./type_d_schema");

module.exports.add_type_d_data = (user_id, lat, long) => {
    let data = new TypeD({
        user_id: user_id,
        geolocation: {
            type: 'Point',
            coordinates: [long, lat]
        }
    }); 
    return data.save();
};