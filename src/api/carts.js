const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const cartsFilePath = path.join(__dirname, '..', 'data', 'carritos.json');

// Middleware para parsear JSON en el body de las peticiones
router.use(express.json());

// POST /api/carts/
router.post('/', (req, res) => {
  // ... Código para crear un nuevo carrito
});

// GET /api/carts/:cid
router.get('/:cid', (req, res) => {
  // ... Código para obtener productos de un carrito
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
  // ... Código para agregar un producto a un carrito
});

module.exports = router;