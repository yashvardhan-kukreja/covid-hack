module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "secret1234",
    DB: process.env.DB || "mongodb+srv://yash98:yash98@cluster0-z7u6i.mongodb.net/test?retryWrites=true&w=majority",
    PORT: process.env.PORT || 8000
};