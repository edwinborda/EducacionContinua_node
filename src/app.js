const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const node_modulesPath = path.join(__dirname, '../node_modules');
const publicPath = path.join(__dirname, '../public');
const mongoose = require('mongoose');
/*bootstrap modules */
app.use('/css', express.static(node_modulesPath + '/bootstrap/dist/css'));
app.use('/js', express.static(node_modulesPath + '/jquery/dist'));
app.use('/js', express.static(node_modulesPath + '/popper.js/dist'));
app.use('/js', express.static(node_modulesPath + '/bootstrap/dist/js'));
/*Custom static files */
app.use(express.static(publicPath));
/*body parser */
app.use(bodyParser.urlencoded({extended:false}));
/*routing */
app.use(require('./routes'));
/*enviroments vars */
const port = process.env.PORT || 3000;
const URLDB = process.env.URLDB || 'mongodb://localhost:27017/educacionContinua'
/*Connect to db */
mongoose.connect(URLDB, {useNewUrlParser: true}, (err, result) => {
    if (err) {
        return console.log(err);
    }
    console.log("Conectado a db");
});
/*Up the services */
app.listen(port, ()=>{
    console.log(`listen on port ${port}`);
}); 