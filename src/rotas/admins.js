const express = require('express');
const router = express.Router();
const { Admin } = require('../db/models');

router.post("/login", async (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;
  
    const admin = await Admin.findOne({
      where: {
        nome: nome
      }
    });
  
    if (admin && (await bcrypt.compare(senha, admin.senha))) {
          console.log('Sucesso')
    } else {
      console.log('Falha ao autenticar. Usuário ou senha inválidos')
    }
  });