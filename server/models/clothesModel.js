const mongoose = require("mongoose");
const { Schema } = mongoose;

const clothesSchema = new Schema({
    gender: {
        type: String,
        //required: [true,'the name is required']
    },
    size: {
        type: Number,
        //required: [true,'the first last name is required']
    },
    color: {
        type: String,
    },
    style: {
        type: String
    }
});

module.exports = mongoose.model("user", userSchema);