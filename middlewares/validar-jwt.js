const { response } = require("express");
const { request } = require("express");
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if (!usuario){
            return response.status(401).json({
                msg: 'Token no valido - Usuario no existe en BD'
            })
        }

        //Verificar si el uid tiene estado en true
        if (!usuario.estado){
            return response.status(401).json({
                msg: 'Token no valido - Usuario con estado: false'
            })
        }

        req.uid = uid;
        req.usuario = usuario;

        next();
    } catch (error) {
       console.error(error);
       res.status(401).json({
           msg: 'Token no valido'
       }) 
    }
}

module.exports = {
    validarJWT
}