const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensagem: 'Olá, mundo!' });
});

app.get('/hello', (req, res) => {
    const nome = req.query.nome || '';
    const sobrenome = req.query.sobrenome || '';
    res.json({ mensagem: `Olá, ${nome} ${sobrenome}!` });
});

app.get('/cliente/:id', (req, res) => {
    const id = req.params.id;
    res.json({ mensagem: `Cliente com ID: ${id}` });
});

var numeros = [];
app.post('/maior-numero', (req, res) => {
    numeros.push(req.body);
    const { num1, num2 } = req.body;
    if (num1 > num2) {
        res.json({ maior: num1 });
    } else {
        res.json({ maior: num2 });
    }
});
app.get('/numeros', (req, res) => {
    res.json(numeros);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});