const TypeB = require("./type_b_schema");

module.exports.add_type_b_data = (user_id, image_base64, lat, long) => {
    let data = new TypeB({
        user_id: user_id,
        image_base64: image_base64,
        geolocation: {
            type: 'Point',
            coordinates: [long, lat]
        }
    }); 
    return data.save();
};