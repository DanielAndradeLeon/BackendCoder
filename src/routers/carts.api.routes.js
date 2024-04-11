// Importar el enrutador desde Express.
import { Router } from "express";

// Importar el gestor de carritos desde el servicio CartManager.
import cartManager from "../services/CartManager.js";

// Crear un nuevo enrutador utilizando Router de Express.
const routerCarts = Router();

// Definir la ruta para obtener un carrito por su ID.
routerCarts.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;

        // Obtener el carrito por su ID utilizando el método del CartManager.
        const cart = await cartManager.getCartById(cid);

        // Enviar la respuesta con el carrito encontrado.
        res.status(200).json({
            status: "success",
            message: "Carrito encontrado exitosamente.",
            data: cart
        });
    } catch (error) {
        // Enviar una respuesta de error si ocurre algún problema.
        res.status(400).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
});

// Definir la ruta para agregar un producto a un carrito
routerCarts.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        // Agregar el producto al carrito utilizando el método del CartManager.
        const cart = await cartManager.addProductInCart(cid, pid);

        // Enviar la respuesta con el carrito actualizado
        return res.status(201).json({
            status: "success",
            message: "Producto añadido exitosamente.",
            data: cart
        });
    } catch (error) {
        // Enviar una respuesta de error si ocurre algún problema.
        res.status(400).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
});

// Definir la ruta para crear un nuevo carrito.
routerCarts.post("/", async (req, res) => {
    // Crear un nuevo carrito utilizando el método del CartManager.
    const cartCreated = await cartManager.createCart();

    // Enviar la respuesta con el carrito creado.
    return res.status(201).json({
        status: "success",
        message: "Carrito creado exitosamente.",
        data: cartCreated
    });
});

// Exportar el enrutador de carritos para su uso en otras partes de la aplicación.
export default routerCarts;
