const mongoose = require("mongoose");
const {Schema} = mongoose;

const clothesSchema = new Schema({

    category: {
        type: Schema.Types.ObjectId,
        ref: 'nameCategory'
    },
    name: {
        type: String
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'typeClothe'
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    serialNumber: {
        type: String
    },
    photo: {
        type: String
    },
    precio : {
        type: Number
    }
});

module.exports = mongoose.model("clothes", clothesSchema);