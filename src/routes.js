const {courseServices} = require('./services/services');

const routes = (app) => {
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/create', (req, res) => {
        res.render('createCourse');
    });

    app.post('/create', (req, res) => {
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
        res.render('createCourse',resp);

    });
}

module.exports = routes;
