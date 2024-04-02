const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const productsFilePath = path.join(__dirname, '..', 'data', 'productos.json');

// Middleware para parsear JSON en el body de las peticiones
router.use(express.json());

// GET /api/products/
router.get('/', (req, res) => {
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo productos.json:', err);
      return res.status(500).json({ error: 'Error al obtener los productos.' });
    }
    const products = JSON.parse(data);
    res.json(products);
  });
});

// GET /api/products/:pid
router.get('/:pid', (req, res) => {
  // ... Código para obtener un producto por su id
});

// POST /api/products/
router.post('/', (req, res) => {
  // ... Código para agregar un nuevo producto
});

// PUT /api/products/:pid
router.put('/:pid', (req, res) => {
  // ... Código para actualizar un producto
});

// DELETE /api/products/:pid
router.delete('/:pid', (req, res) => {
  // ... Código para eliminar un producto
});

module.exports = router;
