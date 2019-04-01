const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require('../helpers/helpers');

const node_modulesPath = path.join(__dirname, '../node_modules');
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../partials')

app.use(express.static(publicPath));
/*bootstrap modules */
app.use('/css', express.static(node_modulesPath + '/bootstrap/dist/css'));
app.use('/js', express.static(node_modulesPath + '/jquery/dist'));
app.use('/js', express.static(node_modulesPath + '/popper.js/dist'));
app.use('/js', express.static(node_modulesPath + '/bootstrap/dist/js'));
/*handlebars */
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, ()=>{
    console.log('listen on port 3000');
});