var usuarios = [];

exports.listarUsuarios = (req, res) => {
    res.json(usuarios);
};

exports.obterUsuarioPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(400).json({ mensagem: 'Usuário não encontrado' });
    }
};
exports.inserir = (req, res) => {
    usuarios.push(req.body);
    res.status(201).json({ mensagem: 'Usuário inserido com sucesso' });
};
exports.obterUsuariosAdmin = (req, res) => {
    const usuariosAdmin = usuarios.filter(u => u.admin == true);
    res.json(usuariosAdmin);
};
exports.autenticar = (req, res) => {
    const { email, senha } = req.body;
    const usu = usuarios.find(u => u.email === email
        && u.senha === senha);
    if (usu) {
        res.json({ autenticado: true });
    } else {
        res.status(401).json({ autenticado: false });
    }
};