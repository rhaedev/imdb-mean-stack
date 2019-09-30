
const express = require('express');
const appUser = express();
const auth = require('../middleware/jwtMiddleware');

const userController = require('../Controllers/userController');


appUser.post('/login', userController.login);

appUser.get('/listar', userController.listar);

appUser.delete('/borrar', userController.borrar);

//Rutas protegidas
//appUser.use(auth.protegerRutas);
appUser.get('/usuario', userController.getUser);
appUser.post('/crear', userController.crear);
appUser.put('/modificar', userController.modificar);
appUser.put('/updatePass', userController.updatePass);

module.exports = appUser;