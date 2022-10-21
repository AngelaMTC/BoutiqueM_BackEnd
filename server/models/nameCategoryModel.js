const mongoose = require("mongoose");
const { Schema } = mongoose;

const nameCategorySchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("namecategories", nameCategorySchema);
