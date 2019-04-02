/*imports */
const fs = require('fs');
const {course} = require('../models/course');

let coursesList = [];

const create = (model) => {
    setList();
    let search = coursesList.find(c => c.id == model.id);
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

const setList = () => {
    try{
        coursesList = require('../../files/courses.json');
    }
    catch (err) {
        coursesList = [];
    }
};

const list = () => {
    setList();
    
    return coursesList.filter(c=>c.state == true);
}

const save = () => {
    let data = JSON.stringify(coursesList);
    fs.writeFile('./files/courses.json', data, (err) => {
        if (err) throw err;
        console.log('File has created successfully');
    });

};

const getById = (id) => {
    setList();
    let course = coursesList.find(c=> c.id == id);
    if(!course) throw "No existe curso";

    return course;
};

module.exports = {
    create,
    list,
    getById
}