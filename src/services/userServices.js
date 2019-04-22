/*Imports */
const bcrypt = require('bcrypt');
let {user} = require('../models/user');

const createUser = (model) => {
    let user_ = new applicant({
        document: model.document,
        name: model.name,
        email: model.email,
        phone: model.phone,
        user: model.user,
        password: model.password
    });
    user_.save((err, result)=> {
        if(err)
        {
            return console.log('Error Save user');
        }
    });
}

const validateSession = (model) => {
    user.findOne({user: model.user}).exec((err, result) => {
        if(err) {
            return console.log("Err: It's not possible validate user");
        }

        if(!result) {
            return false;
        }

        if(!bcrypt.compareSync(mode.password, result.password)) {
            return false;
        }
    });
    
    return true;
};

module.export = {
    create,
    validateSession
};