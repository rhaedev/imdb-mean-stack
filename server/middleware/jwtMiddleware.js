'use strict';

const jwtHelper = require('../helpers/jwtHelper');

function protegerRutas(req, res, next) {
    let authToken = req.headers.authorization;
    if (!authToken) {
        res.status(400).send({ message: 'Acceso Denegado.' })
    } else {
        if (jwtHelper.decode(authToken)) next();
    }
}

module.exports = {
    protegerRutas
};