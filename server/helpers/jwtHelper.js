'use strict';

const jwt = require('jsonwebtoken');
const clave = "mi_clave_secreta";

exports.encode = function(user) {
    let playload ={
        name: user.name,
        email: user.email,
        role: user.role,
        iat: Date.now(),
        exp: (Date.now() + 1000*60*60*24)
    }

    var token = jwt.sign(playload, clave);

    return token;
}

exports.decode = function(token, res, req) {
    jwt.verify(token, clave).then(token => {
        return jwt.decode(token, clave);
    }).catch(err => {
        return res.status(400).json({token: 'Token expirado', error: err})
    })
}