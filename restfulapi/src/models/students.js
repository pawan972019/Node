const mongoose = require('mongoose')
const validator = require('validator')

const studentsSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email id')
            }
        }
    },
    mobile: {
        type: Number,
        unique: true,
        required: true,
        min: 10
    },
    address: {
        type: String,
        required: true
    }
})

const Student = new mongoose.model('Student', studentsSchema)

module.exports = Student