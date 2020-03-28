const User = require("./user_schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");

const config = require("../utils/config");

module.exports.fetch_user_by_id = (id) => {
    return User.findOne({_id: id});
};

module.exports.fetch_user_by_contact = (contact) => {
    return User.findOne({contact: contact});
};

module.exports.hash_pin = (pin) => {
    return new Promise((resolve, reject) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(pin, salt);
        resolve(hash);
    });
};

module.exports.encode_user = (user_obj) => {
    return jwt.sign(JSON.parse(JSON.stringify(user_obj)), config.JWT_SECRET);
};

module.exports.decode_user = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => (err) ? reject(err) : resolve(decoded));
    });
};

module.exports.add_user = (name, contact, aadhar, addr_lat, addr_long, addr_text, addr_pincode, hashed_pin) => {
    let user = new User({
        name: name,
        contact: contact,
        aadhar: aadhar,
        address: {
            geolocation: {
                type: 'Point',
                coordinates: [addr_long, addr_lat]
            },
            text: addr_text,
            pincode: addr_pincode
        },
        password_pin: hashed_pin
    });
    return user.save();
};

module.exports.compare_pin = (entered_pin, hashed_pin) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(entered_pin, hashed_pin, (err, validPin) => {
            if (err)
                reject(err);
            else
                resolve(validPin);
        });
    });
};