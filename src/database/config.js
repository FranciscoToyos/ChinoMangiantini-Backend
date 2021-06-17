//  Conexion a base de datos 
const mongoose = require ('mongoose');
const conexionDB = () => {
    const baseUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7fmuk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    mongoose.set('useCreateIndex', true)

    mongoose.connect(baseUrl, { useNewUrlParser : true, useUnifiedTopology: true } )
        .then( baseUrl => console.log('Conexion a Mongo Exitosa!'))
        .catch( error => console.log(error));
}

module.exports = conexionDB