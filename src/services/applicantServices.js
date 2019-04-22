/*imports */
let User = require('../models/user');
let applicants = [];

const setList = () => {
    User.find({}).exec((err, result) => {
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

module.exports = {
    create,
    list,
    getApplicants,
    remove
}
