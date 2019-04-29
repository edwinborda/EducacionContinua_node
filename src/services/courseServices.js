/*imports */
let Course = require('../models/course');

const create = (model) => {
    let course_ = new Course({
        id: model.id,
        name: model.name,
        description: model.description,
        price: model.price,
        modality: model.modality,
        intensity: model.intensity 
    });
    course_.save((err, result)=> {
        if(err) {
            console.log('Error Save Course');
        }
    });
}
const list = () => {
    return Course.find({state: true}).then((res)=> {
        return res;
    });
}
const getById = (id) => {
    return Course.findOne({id: id}).then((res)=> {
        if(!res) throw 'No es posible encontrar el curso';
    });
};

module.exports = {
    create,
    list,
    getById
}