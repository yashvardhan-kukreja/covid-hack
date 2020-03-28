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

module.exports = router;