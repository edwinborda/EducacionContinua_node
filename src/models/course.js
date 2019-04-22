const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    id: {
        type: String,
        require: true,
        trim: true
    },
    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true
    },
    modality: {
        type: String,
        enum: {
            values: ['Presencial', 'Virtual'],
            message: 'La modalidad no es valida'
        }
    },
    intensity:{
        type: Number
    },
    state: {
        type: Boolean,
        default: true
    }
});

courseSchema.plugin(uniqueValidator);

const Course = mongoose.model("Courses", courseSchema);

module.exports =  Course
