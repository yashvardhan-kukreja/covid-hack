const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const config = require("./utils/config");

const app = express();
const port = config.PORT;
const DB = config.DB;

const auth_router = require("./routers/auth_router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(DB, (err) => {
    if (err) {
        console.error("Error while establishing connection to the database ...");
    } else {
        console.log("Connection established to the database successfully ...");
    }
});

app.use(morgan('dev'));

app.use(helmet());
app.use(compression());

app.use("/api/auth", auth_router);


app.get("/", (req, res) => {
    res.send(`Health check ran successfully!`);
});

app.listen(port, () => console.log(`App running successfully on port number ${port}...`));
