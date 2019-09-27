
const express = require('express');
const appUser = express();
const auth = require('../middleware/jwtMiddleware');

const userController = require('../Controllers/userController');


appUser.post('/login', userController.login);

appUser.get('/listar', userController.listar);

//Rutas protegidas
appUser.use(auth.protegerRutas);
appUser.post('/crear', userController.crear);
appUser.put('/modificar', userController.modificar);
appUser.delete('/borrar', userController.borrar);
appUser.put('/updatePass', userController.updatePass);

module.exports = appUser;