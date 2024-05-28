const express = require('express');
const router = express.Router();
const postagemMid = require('../middlewares/postagens.middleware');
const { Postagens } = require('../db/models');
var  multer   =  require ( 'multer' );
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
    }
})

const fileFilter = (req, file, cb) => {
    const extensoes = /jpeg|jpg|png/i
    if (extensoes.test(path.extname(file.originalname))){
            cb(null, true)
    }else{
            return cb('Formato de arquivo não suportado. Apenas jpg, jpeg e png são suportados.')
    }
}

var  upload  =  multer ( {  storage : storage, fileFilter: fileFilter  } )

router.post('/', upload.single('foto'));
router.post('/', postagemMid);
router.put('/', postagemMid);

router.get('/', async (req, res) => {
    const postagens = await Postagens.findAll();
    const postagensProcessadas = prepararResultado(postagens);
    
    res.json({ postagens: postagensProcessadas });
})

router.get('/:id', async (req, res) => {
    const postagem = await Postagens.findByPk(req.params.id);
    const postagemProcessada = prepararResultado(postagem);

    res.json({ postagem: postagemProcessada });
})

router.put('/', async (req, res) => {
    const id = req.query.id;
    const postagem = await Postagens.findByPk(id);
    if (postagem) {
        postagem.titulo = req.body.titulo;
        postagem.texto = req.body.texto;
        await postagem.save(); 
        res.json({ msg: "Postagem alterada com sucesso!" });
    } else {
        res.status(404).json({ msg: "Postagem não encontrada. Verifique o ID solicitado." })
    }
})

router.post('/:id/uploads', upload.single('foto'), async (req, res) => {
    console.log(req.file);
    
    const id = req.params.id;
    const postagem = await Postagens.findByPk(id);
    console.log(postagem);
    if (postagem) {
        postagem.foto = `/static/uploads/${req.file.filename}`;
        await postagem.save(); 
        res.json({ msg: "Imagem publicada com sucesso!" });
    } else {
        res.status(404).json({ msg: "Postagem não encontrada. Verifique o ID solicitado." })
    }

})

router.post('/', async (req, res) => {
    const data = req.body;
    if (req.file) {
        data.foto = `/static/uploads/${req.file.filename}`
    }
    const postagem = await Postagens.create(data);
    res.json({ msg: "Postagem adicionada com sucesso!", idPostagem: postagem.id })
})

router.delete('/', async (req, res) => {
    const id = req.query.id;
    const postagem = await Postagens.findByPk(id);

    if(postagem) {
        try{
            await postagem.destroy()
            res.json({msg: "Postagem deletada com sucesso!"})
          }catch (error){
            res.status(500).json({msg: "Falha ao remover postagem"})  
          }
        }else{
          res.status(400).json({msg: "Postagem não encontrada!"})
        }
})

function prepararResultado(post){
            const result = Object.assign({}, post)

            if (result.createdAt) delete result.createdAt
            if (result.updatedAt) delete result.updatedAt
            return result
    }

module.exports = router;