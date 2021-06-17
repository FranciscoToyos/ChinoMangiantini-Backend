const ContenidoSchema = require("../database/models/ContenidoSchema");

module.exports = {
  listar: async (req, res, next) => {
    const contenidos = await ContenidoSchema.find();
    console.log(contenidos);
    res.json(contenidos);
  },
  listarUno: async (req, res, next) => {
    const unContenido = await ContenidoSchema.findById(req.params.id);

    res.json(unContenido);
  },

  listarXSeccion: async (req, res, next) => {
    const seccion = req.params.seccion;
    console.log(seccion);

    const contenidoSeccion = await ContenidoSchema.find({
      seccion: seccion,
    });
    res.json({
      Resultados: contenidoSeccion,
      msg: `Se encontro contenido en: ${seccion}. Contenido: ${contenidoSeccion.length}`,
    });
    console.log(contenidoSeccion);
  },
  crear: async (req, res, next) => {
    const { url, descripcion, seccion } = req.body;
    const contenido = new ContenidoSchema({
      url,
      descripcion,
      seccion,
    });
    await contenido.save();
    res.json({
      msg: "Contenido Guardado",
    });
  },
  editar: async (req, res, next) => {
    await ContenidoSchema.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      msg: "Contenido Editado",
    });
  },
  eliminar: async (req, res, next) => {
    await ContenidoSchema.findByIdAndRemove(req.params.id);
    res.json({
      msg: "Contenido Eliminado",
    });
  },
};
