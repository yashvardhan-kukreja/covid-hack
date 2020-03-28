const UserTransactions = require("../models/user/user_db_transactions");
const TypeATransactions = require("../models/type_a_data/type_a_db_transactions");
const TypeBTransactions = require("../models/type_b_data/type_b_db_transactions");
const TypeCTransactions = require("../models/type_c_data/type_c_db_transactions");
const TypeDTransactions = require("../models/type_d_data/type_d_db_transactions");

const Promise = require("bluebird");

module.exports.verify_token = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject({
                meta: {
                    success: false,
                    message: "Please provide the token in the header 'x-access-token'",
                    code: 400
                }
            });
        }
        UserTransactions.decode_user(token)
            .then(data => {
                if (!data) {
                    throw new Error("400");
                } else {
                    resolve({
                        meta: {
                            success: true,
                            message: "Token decoded successfully",
                            code: 200
                        },
                        payload: {
                            decoded: data
                        }
                    });
                }
            })
            .catch(err => {
                let err_body = {
                    meta: {
                        success: false,
                        message: "An error occurred",
                        code: 500
                    }
                };
                if (err.message == "400") {
                    err_body.message = "Corrupted token provided!";
                    err_body.code = 400
                }
                reject(err);
            });
    });
};

module.exports.add_type_a_data = (user_id, image_base64, lat, long) => {
    return new Promise((resolve, reject) => {
        TypeATransactions.add_type_a_data(user_id, image_base64, lat, long)
            .then(data => {
                resolve({
                    meta: {
                        success: true,
                        message: "Added the Type A (X minutes one) data successfully!",
                        code: 200
                    }
                });
            })
            .catch(err => {
                reject({
                    meta: {
                        success: false,
                        message: "An error occurred",
                        code: 500
                    }
                });
            });
    });
};

module.exports.add_type_b_data = (user_id, image_base64, lat, long) => {
    return new Promise((resolve, reject) => {
        TypeBTransactions.add_type_b_data(user_id, image_base64, lat, long)
            .then(data => {
                resolve({
                    meta: {
                        success: true,
                        message: "Added the Type B (6 hours one) data successfully!",
                        code: 200
                    }
                });
            })
            .catch(err => {
                reject({
                    meta: {
                        success: false,
                        message: "An error occurred",
                        code: 500
                    }
                });
            });
    });
};

module.exports.add_type_c_data = (user_id, normal_temp, text) => {
    return new Promise((resolve, reject) => {
        if (typeof(normal_temp) == "string" && normal_temp.toLowerCase() == "true")
            normal_temp = true;
        else
            normal_temp = false;

        TypeCTransactions.add_type_c_data(user_id, normal_temp, text)
            .then(data => {
                resolve({
                    meta: {
                        success: true,
                        message: "Added the Type C (Temperature related one) data successfully!",
                        code: 200
                    }
                });
            })
            .catch(err => {
                reject({
                    meta: {
                        success: false,
                        message: "An error occurred",
                        code: 500
                    }
                });
            });
    });
};

module.exports.add_type_d_data = (user_id, lat, long) => {
    return new Promise((resolve, reject) => {
        TypeDTransactions.add_type_d_data(user_id, lat, long)
            .then(data => {
                resolve({
                    meta: {
                        success: true,
                        message: "Added the Type D (Urgency one) data successfully!",
                        code: 200
                    }
                });
            })
            .catch(err => {
                reject({
                    meta: {
                        success: false,
                        message: "An error occurred",
                        code: 500
                    }
                });
            });
    });
};