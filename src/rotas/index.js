const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('pages/index')
})

router.get('/contact', async (req, res) => {
    res.render('pages/contact')
})

router.get('/book', async (req, res) => {
    res.render('pages/book')
})

module.exports = router;