const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('pages/index')
})

router.get('/contact', async (req, res) => {
    res.render('pages/contact')
})

module.exports = router;