const express = require('express');
const app = express()
const hbs = require('hbs');
const path = require('path');
const partialsPath = path.join(__dirname, '../../partials')
const {courseServices, applicantServices, userServices} = require('../services');

require('../../helpers');

/*handlebars */
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath);

/*Routes */
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    let result = userServices.validateSession({
        user: req.body.user,
        password: req.body.password
    });
    if(result)
        res.render('welcome');
    else
        res.render('index', {
            error: 'Usuario o contraseña no coincide'
        });
});

/*Register new user */
app.get('/newUser', (req, res)=> {
    res.render('newUsers')
});
app.post('/newUser', (req, res)=> {
    userServices.create({
        document: model.document,
        name: model.name,
        email: model.email,
        phone: model.phone,
        user: model.user,
        password: model.password
    })
    res.render('newUsers', {
        message: 'usuario creado'
    })
});

/*courses */
app.get('/course/create', (req, res) => {
    res.render('./course/create');
});

app.post('/course/create', (req, res) => {
    let resp;
    try {
        courseServices.create(req.body);
        resp = {
            message: "Creado curso con exito", 
            open: true
        };
    } catch(err) {
        if (err)
            resp =  {
                message: err,
                open: true
            };
    }
    res.render('./course/create',resp);

});

app.get('/course/list', (req, res) => {
    res.render('./course/list', {
        courses: courseServices.list()
    });
});

app.get('/course/details',(req, res) => {
    try{
        res.render('./course/details', {
            course: courseServices.getById(req.query.id)
        });
    }
    catch (err) {
        if(err)
            res.render('./course/list',{
                message: err,
                open: true
            });
    }
});

app.get('/course/applicants', (req, res) => {
    res.render('./course/applicants',{
        courses: courseServices.list()
    })
});

/*applicant */
app.get('/applicant/new', (req, res)=> {
    res.render('./applicant/new', {
        courses: courseServices.list()
    })
});

app.post('/applicant/new', (req, res)=> {
    let resp;
    try {
        applicantServices.create(req.body);
        resp = {
            courses: courseServices.list(),
            message: 'El aspirante quedó inscrito',
            open: true
        }
    }
    catch (err)
    {
        if(err)
            resp = {
                courses: courseServices.list(),
                message: err,
                open: true
            };
    }
    res.render('./applicant/new', resp);
});

app.get('/applicant/delete', (req, res) => {
    applicantServices.remove(req.query.document)
    res.render('./course/applicants',{
        courses: courseServices.list()
    });
});

module.exports = app;
