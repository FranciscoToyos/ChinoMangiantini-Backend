const express = require('express');
const router = express.Router();
const contenidoController = require ('../controllers/contenidoController')


/* GET al contenido -- endpoint:http://localhost:3100/api/contenido */
router.get('/', contenidoController.listar)
/* POST al contenido -- endpoint:http://localhost:3100/api/contenido */
router.post('/',contenidoController.crear)
/* PUT al producto -- endpoint:http://localhost:3100/api/contenido*/
router.put('/:id', contenidoController.editar);

router.get('/:id', contenidoController.listarUno);
router.get('/seccion/:seccion', contenidoController.listarXSeccion)
/* DELETE al producto -- endpoint:http://localhost:3100/api/contenido */
router.delete('/:id', contenidoController.eliminar);

module.exports = router;