const jwt = require('jsonwebtoken')
const UsuarioSchema = require('../database/models/UsuarioSchema')

module.exports = {
    verificacionToken: 
        async (req,res,next) => {
            try{
                // recibimos un token
                let token = req.headers['x-access-token']

                // si no existe
                if(!token) {
                    return res.status(403).json({
                        msg:'No enviaste un token'
                    })
                }

                //  Si existe decodificamos para extraer el ID
                if(token){
                    const decodify = jwt.verify(token,`${process.env.SECRET}`)
                    req.usuarioId = decodify.id;

                    // Se busca el usuario de ese id
                    const usuario = await UsuarioSchema.findById(req.usuarioId,{password:0})
                    
                    //Si no esta en la Database
                    if(!usuario){
                        return res.status(404).json({
                            msg:'El usuario no existe en la base de datos'
                        })
                    } 
                }
                 next()
            }catch(error){
                return res.status(401).json({
                    msg:'Token invalido'
                })
            }
        }
}