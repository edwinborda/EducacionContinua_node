const express = require('express');
const app = express()
const hbs = require('hbs');
const path = require('path');
const partialsPath = path.join(__dirname, '../../template/partials')
const viewsPath = path.join(__dirname, '../../template/views');
const {courseServices, applicantServices, userServices} = require('../services');
const bcrypt = require('bcrypt');
require('../../helpers');
const session = require('express-session');
/*handlebars */
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); //partials
/*Routes */
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/', (req, res) => {
    userServices.validateSession({
        user: req.body.user
    }).exec((err, result) => {
        if(err) {
            console.log('Err: It is not possible validate user');
            return;
        }
        if(!result) {
            res.render('index', {
                error: 'Usuario o contraseña no coincide'
            });
            return;
        } 
        if(!bcrypt.compareSync(req.body.password, result.password)){
            res.render('index', {
                error: 'Usuario o contraseña no coincide'
            });
            return;
        } 
        req.session.user = result.id;
        req.session.name = result.name;
        req.session.userType = result.userType;
        /*Initialize res.locals */
        res.locals.session = true;
        res.locals.name = result.name;
        res.locals.userType = result.userType; 
        
        res.render('welcome', {
            name: result.name
        });
    });
});
app.get('/exit', (req, res) => {
    req.session.destroy((err)=>{
        if (err) return console.log(err);
    });
    res.redirect('/');
});
/*Register new user */
app.get('/newUser', (req, res)=> {
    res.render('newUsers')
});
app.post('/newUser', (req, res)=> {
    userServices.createUser({
        document: req.body.document,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        user: req.body.user,
        password: req.body.password,
        userType: req.body.userType
    });
    res.render('newUsers', {
        message: 'usuario creado'
    })
});
/*courses */
app.get('/course/create', (req, res) => {
    if (!req.session.user && req.session.userType !== 'Coordinador') {
        res.redirect('/');
        return;
    }
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
app.get('/course/list', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    res.render('./course/list', {
        courses: await courseServices.list()
    });
});
app.get('/course/details',async (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    try{
        res.render('./course/details', {
            course: await courseServices.getById(req.query.id)
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
app.get('/course/applicants', async (req, res) => {
    if (!req.session.user && req.session.userType !== 'Coordinadores') {
        res.redirect('/');
        return;
    }
    res.render('./course/applicants',{
        courses: await courseServices.list()
    })
});
/*applicant */
app.get('/applicant/new', async (req, res) => {
    if (!req.session.user && req.session.userType !== 'Aplicante') {
        res.redirect('/');
        return;
    }
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    var model = await applicantServices.getById(req.session.user);
    
    res.render('./applicant/new', {
        courses: await courseServices.list(),
        id: model._id,
        document: model.document,
        name: model.name,
        email: model.email,
        phone: model.phone
    })
});
app.post('/applicant/new', (req, res)=> {
    let resp;
    try {
        if (!req.session.user)
            applicantServices.create(req.body);
        else
            applicantServices.update(req.body);

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
    if (!req.session.user && req.session.userType !== 'Coordinador') {
        res.redirect('/');
        return;
    }
    applicantServices.remove(req.query.document)
    res.render('./course/applicants',{
        courses: courseServices.list()
    });
});

module.exports = app;
