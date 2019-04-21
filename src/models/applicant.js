const mongoose = require('mongoose')
const Schema = monogoose.Schema

const applicantSchema = new Schema({
    document: {
        type: Number,
        require: true
    },
    name : {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    course: {
        type: String,
        require: true
    }
});

const applicant = mongoose.model("Applicants", applicantSchema);

module.exports =  applicant;
