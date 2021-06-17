const express = require('express');
const router = express.Router();
const  usuariosController = require('../controllers/usuariosController')
const {verificacionToken} = require('../middlewares/index')

// GET a los usuarios -- endpoint: http://localhost:3100/api/usuarios
router.get('/',usuariosController.mostrar)
// POST a los usuarios -- endpoint: http://localhost:3100/api/usuarios
router.post('/',usuariosController.registrar)
/* login del usuario -- endpoint:http://localhost:3000/api/usuarios/login */
router.post('/login', usuariosController.logeo);
/* PUT al usuario -- endpoint:http://localhost:3000/api/usuarios */
router.put('/:id', [ verificacionToken ], usuariosController.editar);
/* DELETE al usuario -- endpoint:http://localhost:3000/api/usuarios */
router.delete('/:id',[ verificacionToken ], usuariosController.eliminar);


module.exports = router;
