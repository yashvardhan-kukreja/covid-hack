const UserController = require("../controllers/user_controller");
const router = require("express").Router();

router.use((req, res, next) => {
    let token = req.headers["x-access-token"];
    UserController.verify_token(token)
        .then(data => {
            req.decoded = data.payload.decoded;
            next();
        })
        .catch(err => res.status(err.meta.code).json(err));
});

router.get("/profile", (req, res) => {
    res.status(200).json({
        meta: {
            success: true,
            message: "Fetched the profile successfully!",
            code: 200
        },
        payload: req.decoded
    });
});

/////////////////////////////////////// SAMPLE SUCCESSFUL RESPONSE /////////////////////////////////////////////////////////////

// {
//     "meta": {
//         "success": true,
//         "message": "Fetched the profile successfully!",
//         "code": 200
//     },
//     "payload": {
//         "address": {
//             "geolocation": {
//                 "type": "Point",
//                 "coordinates": [
//                     77.298594,
//                     28.400145
//                 ]
//             },
//             "text": "5L/153 NIT Faridabad",
//             "pincode": "121001"
//         },
//         "_id": "5e7f4835745e1b00110dcda0",
//         "name": "Yashvardhan Kukreja",
//         "contact": "9876543210",
//         "aadhar": "1234567890",
//         "password_pin": "$2a$10$23Z5KZtZ4b/XAmGbZFNVJ..s9hdfbxyVgIAWNBNFjBYmJTHwM2TEe",
//         "__v": 0,
//         "iat": 1585405364
//     }
// }

router.post("/type-a", (req, res) => {
    let user_id = req.decoded._id;
    let {
        image_base64,
        lat,
        long
    } = req.body;

    UserController.add_type_a_data(user_id, image_base64, lat, long)
        .then(data => res.status(data.meta.code).json(data))
        .catch(err => res.status(err.meta.code).json(err));
});

/////////////////////////////////////// SAMPLE SUCCESSFUL RESPONSE /////////////////////////////////////////////////////////////

// {
//     "meta": {
//         "success": true,
//         "message": "Added the Type A data successfully!",
//         "code": 200
//     }
// }

router.post("/type-b", (req, res) => {
    let user_id = req.decoded._id;
    let {
        image_base64,
        lat,
        long
    } = req.body;

    UserController.add_type_b_data(user_id, image_base64, lat, long)
        .then(data => res.status(data.meta.code).json(data))
        .catch(err => res.status(err.meta.code).json(err));
});

/////////////////////////////////////// SAMPLE SUCCESSFUL RESPONSE /////////////////////////////////////////////////////////////

// {
//     "meta": {
//         "success": true,
//         "message": "Added the Type A data successfully!",
//         "code": 200
//     }
// }

router.post("/type-c", (req, res) => {
    let user_id = req.decoded._id;
    let {
        normal_temp,
        text
    } = req.body;

    UserController.add_type_c_data(user_id, normal_temp, text)
        .then(data => res.status(data.meta.code).json(data))
        .catch(err => res.status(err.meta.code).json(err));
});

/////////////////////////////////////// SAMPLE SUCCESSFUL RESPONSE /////////////////////////////////////////////////////////////

// {
//     "meta": {
//         "success": true,
//         "message": "Added the Type A data successfully!",
//         "code": 200
//     }
// }

router.post("/type-d", (req, res) => {
    let user_id = req.decoded._id;
    let {
        lat,
        long
    } = req.body;

    UserController.add_type_d_data(user_id, lat, long)
        .then(data => res.status(data.meta.code).json(data))
        .catch(err => res.status(err.meta.code).json(err));
});

/////////////////////////////////////// SAMPLE SUCCESSFUL RESPONSE /////////////////////////////////////////////////////////////

// {
//     "meta": {
//         "success": true,
//         "message": "Added the Type A data successfully!",
//         "code": 200
//     }
// }

module.exports = router;