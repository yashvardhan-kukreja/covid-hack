const TypeC = require("./type_c_schema");

module.exports.add_type_c_data = (user_id, normal_temp, text) => {
    let data = new TypeC({
        user_id: user_id,
        normal_temp: normal_temp,
        text: (text) ? text : "No description!"
    }); 
    return data.save();
};