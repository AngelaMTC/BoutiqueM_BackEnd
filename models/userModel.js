const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
    },
    firstlastname: {
        type: String,
    },
    secondlastname: {
        type: String
    },
    email: {
        type: String,
    },
    pass: {
        type: String,
    },
    dateofbirth: {
        type: Date ,
    },
    photo: {
        type: String
    }
});

module.exports = mongoose.model("user", userSchema);