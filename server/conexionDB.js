

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./api');
const bodyParser = require('body-parser');


app.use(cors());
//Inicializaciones
const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());



mongoose.connect('mongodb://localhost:27017/curso', {useCreateIndex: true, useUnifiedTopology: true,
useNewUrlParser: true,}).then(() => {
    console.log("Conexión con éxito");
   
    app.use('/', apiRoutes);
    app.listen(port, function () {
        console.log('Example app listening on port 3000!');
      });

}).catch(error => {
    console.log("error inesperado", error);
});