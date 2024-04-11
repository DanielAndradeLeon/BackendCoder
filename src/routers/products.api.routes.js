// Importar el enrutador desde Express.
import { Router } from "express";

// Importar el gestor de productos desde el servicio ProductManager.
import productManager from "../services/ProductManager.js";

// Importar el middleware de multer para manejar la carga de archivos.
import { uploader } from "../utils/multer.utils.js";

// Crear un nuevo enrutador utilizando Router de Express.
const routerProducts = Router();

// Definir la ruta para obtener todos los productos.
routerProducts.get("/", async (req, res) => {
    const { limit } = req.query;

    // Obtener todos los productos utilizando el método del ProductManager.
    const products = await productManager.getProducts();

    // Limitar la cantidad de productos si se especifica el parámetro 'limit'.
    if (limit && !isNaN(limit)) {
        return res.status(200).json({
            status: "success",
            message: `Products limited to ${limit}`,
            data: products.slice(0, limit)
        });
    }

    // Enviar la respuesta con todos los productos.
    return res.status(200).json({
        status: "success",
        message: "All products",
        data: products
    });
});

// Definir la ruta para obtener un producto por su ID.
routerProducts.get("/:pid", async (req, res) => {
    const { pid } = req.params;

    // Verificar si el ID del producto es válido.
    if (!pid || isNaN(pid)) {
        return res.status(400).json({
            status: "error",
            message: "pid no es válido.",
            data: {}
        });
    }

    // Obtener el producto por su ID utilizando el método del ProductManager.
    const product = await productManager.getProductById(pid);

    // Verificar si se encontró el producto.
    if (!product) {
        return res.status(404).json({
            status: "error",
            message: "Producto no encontrado.",
            data: {}
        });
    }

    // Enviar la respuesta con el producto encontrado.
    return res.status(200).json({
        status: "success",
        message: "Producto encontrado exitosamente.",
        data: product
    });
});

// Definir la ruta para crear un nuevo producto.
routerProducts.post("/", uploader.single("file"), async (req, res) => {
    try {
        // Obtener los datos del producto desde la solicitud.
        const { title, description, code, price, status, stock, category } = req.body;

        // Agregar el producto utilizando el método del ProductManager.
        const product = await productManager.addProduct({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails: req?.file?.filename
        });

        // Enviar la respuesta con el producto creado.
        return res.status(201).json({
            status: "success",
            message: "Producto creado exitosamente.",
            data: product
        });
    } catch (error) {
        // Enviar una respuesta de error si ocurre algún problema.
        res.status(400).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

// Definir la ruta para actualizar un producto por su ID.
routerProducts.put("/:pid", uploader.single("file"), async (req, res) => {
    try {
        // Obtener los datos del producto y su ID desde la solicitud.
        const { title, description, code, price, status, stock, category } = req.body;
        const { pid } = req.params;

        // Actualizar el producto utilizando el método del ProductManager.
        const product = await productManager.updateProduct({
            id: pid,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails: req?.file?.filename
        });

        // Enviar la respuesta con el producto actualizado.
        return res.status(200).json({
            status: "success",
            message: "Producto actualizado exitosamente.",
            data: product
        });
    } catch (error) {
        // Enviar una respuesta de error si ocurre algún problema.
        res.status(400).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

// Definir la ruta para eliminar un producto por su ID.
routerProducts.delete("/:pid", async (req, res) => {
    try {
        // Obtener el ID del producto desde la solicitud.
        const { pid } = req.params;

        // Eliminar el producto utilizando el método del ProductManager.
        await productManager.deleteProduct(pid);

        // Enviar la respuesta de éxito.
        return res.status(204).json({
            status: "success",
            message: "Producto eliminado exitosamente.",
            data: {}
        });
    } catch (error) {
        // Enviar una respuesta de error si ocurre algún problema.
        res.status(400).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

// Exportar el enrutador de productos para su uso en otras partes de la aplicación.
export default routerProducts;
