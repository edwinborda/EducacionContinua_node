const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const userSchema = new Schema({
    document: {
        type: Number,
        require: true
    },
    user: {
        type: String
    },
    password: {
        type: String
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
    userType: {
        type: String,
        enum: {
            values: ['Aplicante', 'Coordinador'],
            message: 'Tipo de usuario no valido'
        },
        default: 'Aplicante'
    },
    course: {
        type: String
    }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("Users", userSchema);
module.exports =  User;
