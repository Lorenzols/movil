const mongoose = require('mongoose');

const movilesSchema = mongoose.Schema({
    nombre: {type: String, require: true},
    marca: {type: String, require: true},
    precio: {type: Number, require: true},
    fecha: {type: String},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Moviles', movilesSchema)