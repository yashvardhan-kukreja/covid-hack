const TypeA = require("./type_a_schema");

module.exports.add_type_a_data = (user_id, image_base64, lat, long) => {
    let data = new TypeA({
        user_id: user_id,
        image_base64: image_base64,
        geolocation: {
            type: 'Point',
            coordinates: [long, lat]
        }
    }); 
    return data.save();
};