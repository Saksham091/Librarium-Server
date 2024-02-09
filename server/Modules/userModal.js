const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    
    lastName: {
        type: String,
        require: true,
        trim: true
    },

    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
        trim: true,
        min: 8,
    },

    wishlist: {
        type: Array,
    }

})

module.exports = mongoose.model("user", userSchema)