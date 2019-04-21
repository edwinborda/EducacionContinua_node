const mongoose = require('mongoose')
const Schema = monogoose.Schema

const courseSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    modality: {
        type: Number,
        require: false
    },
    intensity:{
        type: Number,
        require: false
    },
    state: {
        type: Boolean,
        require: true
    }
});

const course = monogoose.model("Courses", courseSchema);

module.exports =  course
