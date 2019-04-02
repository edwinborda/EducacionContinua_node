const {courseServices} = require('./services/services');

const routes = (app) => {
    app.get('/', (req, res) => {
        res.render('index');
    });

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
}

module.exports = routes;
