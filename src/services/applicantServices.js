/*imports */
const fs = require('fs');
const {applicant} = require('../models/applicant');

let applicants = [];

const setList = () => {
    try {
        applicants = require('../../files/applicants.json');
    }
    catch (err) {
        applicants = [];
    }
}

const create = (model) => {
    setList();
    let search = applicants.find(a => a.document == model.document && a.course == model.course);
    if(typeof search != 'undefined')
    {
        throw "El aspirante ya esta inscrito en el curso";
    }

    applicant.document = model.document;
    applicant.name = model.name;
    applicant.email = model.email;
    applicant.phone = model.phone;
    applicant.course = model.course;

    applicants.push(applicant);
    save();

}

const list = () => {
    setList();

    return applicants;
}

const save = () => {
    let data = JSON.stringify(applicants);
    fs.writeFile('./files/applicants.json', data, (err) => {
        if (err) throw err;
        console.log('File has created successfully');
    });
}

module.exports = {
    create,
    list
}
