const UserController = require("../controllers/auth_controller");
const router = require("express").Router();

router.post("/register", (req, res) => {
    let {
        name,
        contact,
        aadhar,
        addr_text,
        addr_long,
        addr_lat,
        addr_pincode,
        pin
    } = req.body;

    UserController.register_user(name, contact, aadhar, addr_lat, addr_long, addr_text, addr_pincode, pin)
        .then(data => res.status(data.meta.code).json(data))
        .catch(err => res.status(err.meta.code).json(err));
});

router.post("/login", (req, res) => {
    let {
        contact,
        pin
    } = req.body;

    UserController.login_user(contact, pin)
        .then(data => res.status(data.meta.code).json(data))
        .catch(err => res.status(err.meta.code).json(err));
});

/////////////////////////////////////// SAMPLE ERROR RESPONSE /////////////////////////////////////////////////////////////

// {
//     "meta": {
//         "success": false,
//         "message": "User not found with the provided contact",
//         "code": 404
//     }
// }

/////////////////////////////////////// SAMPLE SUCCESSFUL RESPONSE /////////////////////////////////////////////////////////////

// {
//     "meta": {
//         "success": true,
//         "message": "User logged in successfully!",
//         "code": 200
//     },
//     "body": {
//         "user": {
//             "address": {
//                 "geolocation": {
//                     "type": "Point",
//                     "coordinates": [
//                         77.298594,
//                         28.400145
//                     ]
//                 },
//                 "text": "5L/153 NIT Faridabad",
//                 "pincode": "121001"
//             },
//             "_id": "5e7f3f89ef6db8294b1c0f78",
//             "name": "Yashvardhan Kukreja",
//             "contact": "9876543210",
//             "aadhar": "1234567890",
//             "password_pin": "$2a$10$F4apocjj8lmSqiWQgq06TO2pnd9FOoMgqD2MMoG6aVB9mejpA2Wey",
//             "__v": 0
//         },
//         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjp7Imdlb2xvY2F0aW9uIjp7InR5cGUiOiJQb2ludCIsImNvb3JkaW5hdGVzIjpbNzcuMjk4NTk0LDI4LjQwMDE0NV19LCJ0ZXh0IjoiNUwvMTUzIE5JVCBGYXJpZGFiYWQiLCJwaW5jb2RlIjoiMTIxMDAxIn0sIl9pZCI6IjVlN2YzZjg5ZWY2ZGI4Mjk0YjFjMGY3OCIsIm5hbWUiOiJZYXNodmFyZGhhbiBLdWtyZWphIiwiY29udGFjdCI6Ijk4NzY1NDMyMTAiLCJhYWRoYXIiOiIxMjM0NTY3ODkwIiwicGFzc3dvcmRfcGluIjoiJDJhJDEwJEY0YXBvY2pqOGxtU3FpV1FncTA2VE8ycG5kOUZPb01ncUQyTU1vRzZhVkI5bWVqcEEyV2V5IiwiX192IjowLCJpYXQiOjE1ODUzOTc3NTd9.TqI15_kwqndWkxcExmXpTv2Fmx0qXcFs146AOUPKz60"
//     }
// }

module.exports = router;