const mongoose = require("mongoose");
const {Schema} = mongoose;

const bebeSchema = new Schema({
    clothes: {
        type: String
    },
    type: {
        type: String
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    img: {
        type: String
    }
});

module.exports = mongoose.model("dama", bebeSchema);