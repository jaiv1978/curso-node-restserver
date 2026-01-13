const { response } = require("express")

const esAdminrole = (req, res = response, next) => {

    if (!req.usuario){
        return res.status(500).json({
            msg: "Sequiere verificar el role sin validar el token primero"
        });
    }
    
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}

const tieneRole = ( ...roles ) => {
    return (req, res = response, next) => {
        if (!req.usuario){
            return res.status(500).json({
                msg: "Sequiere verificar el role sin validar el token primero"
            });
        }

        if (!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }
}

module.exports = {
    esAdminrole,
    tieneRole
}