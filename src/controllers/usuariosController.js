const UsuarioSchema = require('../database/models/UsuarioSchema');
const { sign, JsonWebTokenError } = require('jsonwebtoken')

module.exports = {
    mostrar : async(req,res,next) => {
        const usuarios = await UsuarioSchema.find()
        res.json(usuarios)
    },
    registrar: async(req,res,next) => {
        const { nombre, apellido, email, password } = req.body
        const nuevoUsuario = new UsuarioSchema({
            nombre,
            apellido,
            email,
            password
        });

        // encryptar password
        nuevoUsuario.password = await UsuarioSchema.encryptPassword(nuevoUsuario.password)
        const usuarioGuardado = await nuevoUsuario.save();

        // ** Generacion del token
        const token = sign({id:usuarioGuardado._id},`${ process.env.SECRET }`)

        res.json({
            status:'Usuario Registrado',
            token: token
        })
    },
       

    logeo: async(req,res,next) => {

        const encontrarUsuario = await UsuarioSchema.findOne({
            email: req.body.email
        })

        if(!encontrarUsuario) {
            return res.status(400).json({
                msg: 'No se encuentra el usuario'
            })
        }

        const comparaPass = await UsuarioSchema.comparePassword(
            req.body.password,
            encontrarUsuario.password
        )
        if(!comparaPass){
            return res.status(401).json({
                token:null,
                msg:'Password incorrecto'
            })
        }

        // ** Generacion de token
        const token = sign({id:encontrarUsuario._id},`${process.env.SECRET}`)
        res.json({token})

    },

        editar: async(req,res,next) => {
            await UsuarioSchema.findByIdAndUpdate(req.params.id, req.body)
        
            res.json({
                status: 'Usuario Editado'
            })
    },
        eliminar: async (req,res,next) => {
            await UsuarioSchema.findByIdAndRemove(req.params.id)
            res.json({
                status:'Usuario Eliminado'
            })
    },
}