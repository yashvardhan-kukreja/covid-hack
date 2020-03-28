const UserTransasctions = require("../models/user/user_db_transactions");
const Promise = require("bluebird");

module.exports.register_user = (name, contact, aadhar, addr_lat, addr_long, addr_text, addr_pincode, pin) => {
    return new Promise((resolve, reject) => {
        UserTransasctions.hash_pin(pin)
            .then(hashed_pin => UserTransasctions.add_user(name, contact, aadhar, addr_lat, addr_long, addr_text, addr_pincode, hashed_pin))
            .then(data => {
                resolve({
                    meta: {
                        success: true,
                        message: `Registered ${name} successfully!`,
                        code: 200
                    }
                });
            })
            .catch(err => {
                console.error(err);
                if (err.code == 11000) {
                    reject({
                        meta: {
                            success: false,
                            message: "User already exists with the same contact no. or aadhar card no.", // user already exists
                            code: 400
                        }
                    });
                } else {
                    reject({
                        meta: {
                            success: false,
                            message: "An error occurred", // An error occurred
                            code: 500
                        }
                    });
                }
            });
    });
};

module.exports.login_user = (contact, pin) => {
    return new Promise((resolve, reject) => {
        let current_user;
        UserTransasctions.fetch_user_by_contact(contact)
            .then(user => {
                if (!user) {
                    throw new Error("404");
                } else {
                    current_user = user;
                    return UserTransasctions.compare_pin(pin, user.password_pin);
                }
            })
            .then(validPin => {
                if (!validPin)
                    throw new Error("403");
                else {
                    let token = UserTransasctions.encode_user(current_user);
                    resolve({
                        meta: {
                            success: true,
                            message: "User logged in successfully!",
                            code: 200
                        },
                        body: {
                            user: current_user,
                            token: token
                        }
                    });
                }
            })
            .catch(err => {
                console.error(err);
                err_body = {
                    meta: {
                        success: false,
                        message: "An error occurred",
                        code: 500
                    }
                };
                if (err.message == "404") {
                    err_body.meta.message = "User not found with the provided contact";
                    err_body.meta.code = 404;
                } else if (err.message == "403") {
                    err_body.meta.message = "Entered the wrong password pin for the provided contact number";
                    err_body.meta.code = 403
                }
                reject(err_body);
            });
    });
};