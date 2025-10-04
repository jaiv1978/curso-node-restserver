const { request, response } = require('express')

const usuariosGet = (req = request, res = response) => {
    const { name } = req.query;

    return res.json({
        msg: "get API",
        name
    });
}

const usuariosPost = (req, res = response) => {
    const body = req.body;

    return res.json({
        msg: "post API",
        body
    });
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;

    return res.json({
        msg: "put API",
        id
    });
}

const usuariosDelete = (req, res = response) => {
    return res.json({
        msg: "delete API"
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}