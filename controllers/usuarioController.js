const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoUsuario = async (req, res) => {

    // Mostrar mensajes de error de express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    
    // Verificar si el usuario ya estuvo registrado
    const { email, password } = req.body;

    let usuario = await Usuario.findOne({ email });

    if(usuario) {
        return res.status(400).json({ msg: 'El usuario ya esta registrado' });
    }

    // Crear un nuevo usuario
    usuario = new Usuario(req.body);
    
    // Hashear el password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt );

    try {
        await usuario.save();
        res.json({msg : 'Usuario Creado Correctamente'});
    } catch (error) {
        console.log(error);
    }

}