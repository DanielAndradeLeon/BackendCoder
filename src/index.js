const express = require('express');
const productsRouter = require('./api/products');
const cartsRouter = require('./api/carts');

const app = express();
const PORT = 8080;

// Rutas para productos
app.use('/api/products', productsRouter);

// Rutas para carritos
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});