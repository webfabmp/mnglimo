var express = require('express');
const rotaIndex = require('./rotas/index')
const expressEjsLayouts = require('express-ejs-layouts');
const path = require('path')

var app = express(); 

app.use(express.json());

app.use(expressEjsLayouts)

const PORT = 3000;

app.set('view engine', 'ejs');

app.set('layout', 'layouts/layoutblog'); 

app.use('/static', express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rotaIndex);

app.listen(PORT, () => {
    console.log(`Iniciando servidor no ambiente ${process.env.NODE_ENV}, porta: ${PORT}`);
})