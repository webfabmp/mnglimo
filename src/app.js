var express = require('express');
const rotaIndex = require('./rotas/index')
const rotaPostagem = require('./rotas/postagens'); 
const helmet = require('helmet')

var app = express(); 
var expressLayouts = require('express-ejs-layouts');

app.use(helmet);

app.use(express.json());

const PORT = process.env.port || 8080;

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.set('layout', 'layouts/layoutblog'); 

app.use('/static', express.static('public'));

app.use('/', rotaIndex);

app.use('/api/postagens', rotaPostagem);

app.listen(port, () => {
    console.log(`Iniciando servidor no ambiente ${process.env.NODE_ENV}.`)
    console.log(`Servidor funcionando na porta ${port}.`);
})