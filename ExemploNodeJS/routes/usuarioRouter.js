const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.get('/', usuarioController.listarUsuarios);
router.get('/ativo', usuarioController.obterUsuariosAtivos);
router.get('/:id', usuarioController.obterUsuarioPorId);
router.post('/', usuarioController.inserir);
router.post('/autenticar', usuarioController.autenticar);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.excluir);

module.exports = router;