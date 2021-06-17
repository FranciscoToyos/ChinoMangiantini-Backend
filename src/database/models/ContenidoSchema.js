const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContenidoSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    seccion: {
      type: {String},
      required: true,
      
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Contenido", ContenidoSchema);
