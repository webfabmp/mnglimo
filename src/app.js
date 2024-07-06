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

app.use('/sitemap.xml', async (req, res, next) => {
  res.type('text/xml')
  res.send(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->


<url>
  <loc>https://www.limoroyalroad.com/</loc>
  <lastmod>2024-07-05T19:49:41+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://www.limoroyalroad.com/contact</loc>
  <lastmod>2024-07-05T19:49:41+00:00</lastmod>
  <priority>0.80</priority>
</url>


</urlset>`
  )
});

app.use('/static', express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rotaIndex);

const url = `https://royalroad.onrender.com/`; // Replace with your Render URL
const interval = 30000; // Interval in milliseconds (30 seconds)

//Reloader Function
function reloadWebsite() {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
        // Faça algo com os dados recebidos (se necessário)
      })
      .catch(error => {
        console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
      });
  }

setInterval(reloadWebsite, interval);

app.listen(PORT, () => {
    console.log(`Iniciando servidor no ambiente ${process.env.NODE_ENV}, porta: ${PORT}`);
})