/*imports */
const fs = require('fs');
const {course} = require('../models/course');


let coursesList = [];

const create = (model) => {
    list();
    let search = coursesList.find(c => c.id == model.id);
    console.log("search:" + search);
    if(search) throw "Curso con ese id ya existe";

    course.id = model.id
    course.name = model.name,
    course.description = model.description,
    course.price = model.price,
    course.modality = model.modality;
    course.intensity = model.intensity;
    coursesList.push(course);
    save();
}

const list = () => {
    try{
        coursesList = require('../../files/courses.json');
    }
    catch{
        coursesList = [];
    }
};

const save = () => {
    let data = JSON.stringify(coursesList);
    fs.writeFile('./files/courses.json', data, (err) => {
        if (err) throw err;
        console.log('File has created successfully');
    });

};

module.exports = {
    create
}