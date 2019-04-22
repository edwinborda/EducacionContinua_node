const express = require('express');
const app = express()
const hbs = require('hbs');
const path = require('path');
const partialsPath = path.join(__dirname, '../../partials')
const {courseServices, applicantServices, userServices} = require('../services');
const session = require('express-session');
const bcrypt = require('bcrypt');
require('../../helpers');

/*handlebars */
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath);
/*Session */
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use((req, res, next) => {
    if (req.session.usuario) {
        res.locals.session = true,
        res.locals.name = req.session.name
        res.locals.userType = req.session.userType
    }
    next();
});
/*Routes */
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/index', (req, res) => {
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
app.get('/course/list', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    res.render('./course/list', {
        courses: courseServices.list()
    });
});
app.get('/course/details',(req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
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
    if (!req.session.user && req.session.userType !== 'Coordinadores') {
        res.redirect('/');
        return;
    }
    res.render('./course/applicants',{
        courses: courseServices.list()
    })
});
/*applicant */
app.get('/applicant/new', (req, res)=> {
    if (!req.session.user && req.session.userType !== 'Aplicante') {
        res.redirect('/');
        return;
    }
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
