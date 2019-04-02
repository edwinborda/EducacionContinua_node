/*imports */
const fs = require('fs');
let {applicant} = require('../models/applicant');

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
    applicant = {};
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

const getApplicants = (course) => {
    setList();
    let applicantList = applicants.filter(a => a.course == course);

    return applicantList;
}

const save = () => {
    let data = JSON.stringify(applicants);
    fs.writeFile('./files/applicants.json', data, (err) => {
        if (err) throw err;
        console.log('File has created successfully');
    });
}

const remove = (document, idCourse) => {
    setList();
    let result = applicants.filter(it => it.document != document && it.course != idCourse);
    applicants = result;
    save();
}

module.exports = {
    create,
    list,
    getApplicants,
    remove
}
