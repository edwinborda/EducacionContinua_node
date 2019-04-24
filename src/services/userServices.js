/*Imports */
let User = require('../models/user');
const bcrypt = require('bcrypt');
const createUser = (model) => {

    let user_ = new User({
        document: model.document,
        name: model.name,
        email: model.email,
        phone: model.phone,
        user: model.user,
        password: bcrypt.hashSync(model.password, 10) 
    });
    user_.save((err, result)=> {
        if(err)
        {
            return console.log('Error Save user');
        }
    });
}

const validateSession = (model) => {
    return User.findOne({user: model.user});
};

const validate = 

module.exports = {
    createUser,
    validateSession
};