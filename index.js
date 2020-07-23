require('dotenv').config();
const Console = require('console');
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 8080;

const resOptions = {
  target: process.env.RES_HOST || 'localhost:3001',
  changeOrigin: true,
};

const descOptions = {
  target: process.env.DESC_HOST || 'localhost: 3000',
  changeOrigin: true,
};

const app = express();
const proxyPath = path.join(__dirname);
const proxyRes = createProxyMiddleware(resOptions);
const proxyDesc = createProxyMiddleware(descOptions);

app.use('/:id', express.static(proxyPath));

app.get('/:id/reservation/style.css', proxyRes);
app.get('/:id/reservation/reservationBundle.js', proxyRes);
app.get('/api/reservation/:id', proxyRes);

app.get('/description/main.js', proxyDesc);
app.get('/api/description/:id', proxyDesc);

app.listen(port, () => {
  Console.log(`proxy listening on port ${port}`);
});
