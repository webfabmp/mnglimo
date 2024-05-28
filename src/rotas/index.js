const express = require('express');
const router = express.Router();
const { Postagens } = require('../db/models')
const moment = require('moment');
moment.locale('pt-br')

router.get('/', async (req, res) => {
    res.render('pages/index')
})

router.get('/desaparecidos', async (req, res) => {
    const postagens = await Postagens.findAll({raw: true, nest: true})
    const postagensProntas = postagens.map((postagem) => prepararResultado(postagem))
    res.render('pages/desaparecidos', {postagens: postagensProntas})
})

router.get('/adocao', async (req, res) => {
    const postagens = await Postagens.findAll({raw: true, nest: true})
    const postagensProntas = postagens.map((postagem) => prepararResultado(postagem))
    res.render('pages/adocao', {postagens: postagensProntas})
})

router.get('/denuncias', async (req, res) => {
    const postagens = await Postagens.findAll({raw: true, nest: true})
    const postagensProntas = postagens.map((postagem) => prepararResultado(postagem))
    res.render('pages/denuncias', {postagens: postagensProntas})
})

router.get('/contatos', async (req, res) => {
    res.render('pages/contatos')
})

router.get('/postagem/:id', async (req, res) => {
    const postagem = await Postagens.findByPk(req.params.id, {raw: true, nest: true})
    const postagemPronta = prepararResultado(postagem)
    res.render('pages/postagem', {postagem: postagemPronta})
})

function prepararResultado(post){
    const result = Object.assign({}, post)
    result.postadoEm = moment(result.createdAt).format('DD [de] MMMM [de] yyyy [às] HH:mm')

    if (result.createdAt) delete result.createdAt
    if (result.updatedAt) delete result.updatedAt
    return result;
}

module.exports = router;