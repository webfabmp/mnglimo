const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('pages/index')
})

router.get('/contact', async (req, res) => {
    res.render('pages/contact')
})

router.get('/sitemap.xml', async (req, res) => {
    res.sendFile('sitemap.xml')
})

module.exports = router;