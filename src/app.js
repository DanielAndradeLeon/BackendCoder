const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');

// Crear una instancia de ProductManager con la ruta del archivo donde se guardarán los productos
const filePath = './data/products.json'; // Ruta del archivo donde se guardarán los productos
const manager = new ProductManager(filePath);

// Middleware para configurar la política de seguridad de contenido (Content-Security-Policy)
app.use((_, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' http://localhost:*"); // Permitir carga de recursos desde localhost
  next();
});

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Endpoint para obtener todos los productos con soporte para query param 'limit'
app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = manager.getProducts();

  let productsToSend = products;

  if (!isNaN(limit)) {
    productsToSend = products.slice(0, limit); // Obtener solo los primeros 'limit' productos
  }

  res.json(productsToSend);
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = manager.getProductById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  res.json(product);
});

// Ruta para manejar cualquier otra solicitud que no esté definida
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Iniciar el servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});