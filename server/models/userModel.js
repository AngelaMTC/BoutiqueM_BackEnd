const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        //required: [true,'the name is required']
    },
    firstlastname: {
        type: String,
        //required: [true,'the first last name is required']
    },
    secondlastname: {
        type: String
    },
    email: {
        type: String,
        // required: [true,'the email is required']
    },
    pass: {
        type: String,
        //required: [true,'the pass is required']
    },
    dateofbirth: {
        type: Date ,
        //required: [true,'the date of birth is required']
    },
    photo: {
        type: String
    }
});

module.exports = mongoose.model("user", userSchema);