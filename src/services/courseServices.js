/*imports */
let Course = require('../models/course');
let coursesList = [];

const create = (model) => {
    setList();
    let search = coursesList.find(c => c.id == model.id);
    if(typeof search != 'undefined') throw "Curso con ese id ya existe";

    let course_ = new Course({
        id: model.id,
        name: model.name,
        description: model.description,
        price: model.price,
        modality: model.modality,
        intensity: model.intensity 
    });
    
    course_.save((err, result)=> {
        if(err)
        {
            console.log('Error Save Course');
        }
    });
}

const setList = () => {
    Course.find({}).exec((err, result)=> {
        if(err) {
            console.log('Error: Can not find any course ');
        }

        coursesList = result;
    });
};

const list = () => {
    setList();
    return coursesList.filter(c=>c.state == true);
}

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