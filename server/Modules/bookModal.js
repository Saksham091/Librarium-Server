const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: String,
        required: true,
        min: 0
    },
})

module.exports = mongoose.model("Book", bookSchema);
