/*imports */
let User = require('../models/user');
let ObjectID = require('mongoose').ObjectID;
let applicants = [];

const setList = async () => {
    await User.find({}).exec((err, result) => {
        if(err) {
           return console.log('Err: Can not possible read info');
        }
        applicants =  result;
    });
}

const create = (model) => {
    setList();
    let search = applicants.find(a => a.document == model.document && a.course == model.course);
    if(typeof search != 'undefined')
    {
        throw "El aspirante ya esta inscrito en el curso";
    }
    let user_ = new User({
        document: model.document,
        name: model.name,
        email: model.email,
        phone: model.phone,
        course: model.course
    });
    user_.save((err, result)=> {
        if(err)
        {
            return console.log('Error Save Applicants');
        }
    });

}

const list = () => {
    setList();
    return applicants;
}

const getApplicants = (course) => {
    setList();
    let applicantList = applicants.filter(a => a.course == course);

    return applicantList;
}

const remove = (document, idCourse) => {
    
    User.findOneAndDelete({document: document, course: idCourse}, (err, result)=> {
        if (err) {
            return console.log('Err: can not delete element');
        }
    });
}

const getById = (id) => {
    return User.findById(id).then((res) => {
        if(!res) throw 'No existe aplicante';
        return res;
    });
};

const update = (model) => {
    User.updateOne({_id: ObjectID(model.id)}, {
        document: model.document,
        name: model.name,
        email: model.email,
        phone: model.phone,
        course: model.course
    }, (err) => {
        if (err) throw 'No es posible actualizar' + err;
    });
}

module.exports = {
    create,
    list,
    getApplicants,
    remove,
    getById,
    update
}
