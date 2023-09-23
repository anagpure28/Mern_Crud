const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: {type: String, require: true},
    img: {type: String, require: true},
    year: {type: Number, require: true},
    genre: {type: [String], require: true},
    rating: {type: Number, require: true}
},{
    versionKey: false,
})

module.exports = mongoose.model("movie", movieSchema);