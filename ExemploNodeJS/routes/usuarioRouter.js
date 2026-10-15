const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.get('/', usuarioController.listarUsuarios);
router.get('/admin', usuarioController.obterUsuariosAdmin);
router.get('/:id', usuarioController.obterUsuarioPorId);
router.post('/', usuarioController.inserir);
router.post('/autenticar', usuarioController.autenticar);

module.exports = router;