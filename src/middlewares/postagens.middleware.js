const Ajv = require('ajv');
const ajv = new Ajv();
const postagensSchema = require('../schemas/postagens.schemas') 

function validarPostagem (req, res, next) {
    if (!req.body) {
        return res.status(400).json({ msg: "Nenhum corpo de solicitação fornecido" });
    }

    const postagem = req.body;

    const validar = ajv.compile(postagensSchema);
    const valido = validar(postagem);

    if (valido) {
        next();
    } else {
        res.status(400).json({ msg: "Dados inválidos", erros: validar.errors });
    }
}
 
module.exports = validarPostagem;