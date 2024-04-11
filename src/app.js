// Importar el framework Express para manejar las rutas y la lógica del servidor.
import express from "express";

// Importar las rutas para productos y carritos desde archivos separados.
import routerProducts from "./routers/products.api.routes.js";
import routerCarts from "./routers/carts.api.routes.js";

// Crear una aplicación Express.
const app = express();

// Definir el puerto en el que la aplicación va a escuchar.
const port = 8080;

// Middleware para manejar solicitudes y respuestas JSON.
app.use(express.json());

// Middleware para manejar datos codificados en la URL.
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde el directorio 'public'.
app.use(express.static("public"));

// Usar las rutas importadas para manejar solicitudes que comiencen con '/api/products' y '/api/carts'.
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

// Middleware para manejar rutas no definidas, devolviendo un error 400.
app.use("*", (req, res) => {
    return res.status(400).json({
        status: error,
        message: "Bad request",
        data: []
    });
});

// Iniciar el servidor y hacer que escuche en el puerto especificado.
app.listen(port, () => {
    console.log(`Listen port: ${port}`);
});