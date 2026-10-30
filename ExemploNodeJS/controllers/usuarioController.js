const usuarioModel = require('../models/usuario');

exports.listarUsuarios = async (req, res) => {
    const usuarios = await usuarioModel.find();
    res.json(usuarios);
};

exports.obterUsuarioPorId = async (req, res) => {
    const id = req.params.id;
    const usuario = await usuarioModel.findById(id);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(400).json({ mensagem: 'Usuário não encontrado' });
    }
};
exports.inserir = async (req, res) => {
    const usuario = await usuarioModel.create(req.body);
    res.status(201).json({ mensagem: 'Usuário inserido com sucesso' });
};
exports.obterUsuariosAtivos = async (req, res) => {
    const usuariosAdmin = await usuarioModel.find({ ativo: true });
    res.json(usuariosAdmin);
};
exports.autenticar = async (req, res) => {
    const { email, senha } = req.body;
    const usu = await usuarioModel.findOne({ email, senha, ativo: true });
    if (usu) {
        res.json({ autenticado: true });
    } else {
        res.status(401).json({ autenticado: false });
    }
};
exports.atualizar = async (req, res) => {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    const usuario = await
        usuarioModel.findByIdAndUpdate(id, dadosAtualizados, { new: true });
    if (usuario) {
        res.json({ mensagem: 'Usuário atualizado com sucesso' });
    } else {
        res.status(400).json({ mensagem: 'Usuário não encontrado' });
    }
};
exports.excluir = async (req, res) => {
    const id = req.params.id;
    const usuario = await usuarioModel.findByIdAndDelete(id);
    if (usuario) {
        res.json({ mensagem: 'Usuário excluído com sucesso' });
    } else {
        res.status(400).json({ mensagem: 'Usuário não encontrado' });
    }
};