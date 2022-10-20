const mongoose = require("mongoose");
const {Schema} = mongoose;

const typeClotheSchema = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model("typeClothe", typeClotheSchema);