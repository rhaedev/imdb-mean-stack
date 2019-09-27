'use strict';

const express = require('express');
const appMovie = express();
//const auth = require('../middleware/jwtMiddleware');
const movieController = require('../Controllers/moviesController');
const fileUpload = require('express-fileupload');

appMovie.get('/listar', movieController.listarPelicula);
appMovie.post('/crear', movieController.crearPelicula);
appMovie.delete('/borrar', movieController.borrarPelicula);
appMovie.put('/modificar', movieController.modificarPelicula);

appMovie.use(fileUpload());

appMovie.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let myFile = req.files.myFile;
  
    // Use the mv() method to place the file somewhere on your server
    myFile.mv('public/images/filename.jpg', function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });

module.exports = appMovie;