const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const node_modulesPath = path.join(__dirname, '../node_modules');
const publicPath = path.join(__dirname, '../public')
const mongoose = require('mongoose')

/*bootstrap modules */
app.use('/css', express.static(node_modulesPath + '/bootstrap/dist/css'));
app.use('/js', express.static(node_modulesPath + '/jquery/dist'));
app.use('/js', express.static(node_modulesPath + '/popper.js/dist'));
app.use('/js', express.static(node_modulesPath + '/bootstrap/dist/js'));
/*Custom static files */
app.use(express.static(publicPath));

/*body parser */
app.use(bodyParser.urlencoded({extended:false}));

/*Connect to db */
mongoose.connect('mongodb://localhost/educacionContinua', {useNewUrlParser: true});

/*routing */
app.use(require('./routes'));

app.listen(3000, ()=>{
    console.log('listen on port 3000');
});