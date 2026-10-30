const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario', {
    nome: String,
    email: String,
    senha: String,
    ativo: Boolean
}, 'usuario');

module.exports = Usuario;
