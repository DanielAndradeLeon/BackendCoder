// Importar funciones para manejar archivos del sistema y resolver rutas.
import { writeFile, readFile } from "fs/promises";
import { resolve } from "path";

// Importar el módulo que maneja la lógica de los productos.
import productManager from "./ProductManager.js";

// Definir la clase CartManager para manejar carritos de compras.
class CartManager {
    #carts; // Array privado para almacenar los carritos.
    #path; // Ruta al archivo JSON que guarda los datos de los carritos.

    // Constructor que inicializa la ruta del archivo y el array de carritos.    
    constructor() {
        this.#path = resolve("./src/data/carts.json"); // Ruta del archivo de carritos.
        this.#carts = []; // Inicializar el array de carritos vacío.
    }

    // Método para crear un nuevo carrito.
    createCart = async () => {
        await this.#loadCarts(); // Cargar carritos existentes desde el archivo.

        // Generar un nuevo ID para el carrito.
        const id = Math.max(...this.#carts.map((p) => p.id)) + 1 ?? 1;
       
        // Crear un nuevo carrito con el ID generado y sin productos inicialmente.
        const newCart = { id: id == -Infinity ? 1 : id, products: [] };

        // Agregar el nuevo carrito al array de carritos.
        this.#carts.push(newCart);

        // Guardar el array actualizado en el archivo JSON.
        await writeFile(this.#path, JSON.stringify(this.#carts, null, "\t"));

        // Devolver el nuevo carrito creado.
        return newCart;
    };

    // Método para obtener un carrito por su ID.
    getCartById = async (cid) => {
        await this.cartExists(cid); // Verificar si el carrito existe.

        // Buscar y devolver el carrito con el ID especificado.
        return this.#carts.find((c) => c.id == cid);
    };

    // Método para agregar un producto a un carrito.
    addProductInCart = async (cid, pid) => {
        await this.cartExists(cid); // Verificar si el carrito existe.
        await productManager.productExists(pid); // Verificar si el producto existe.

        // Obtener el producto desde el productManager.
        const product = await productManager.getProductById(pid);

        // Verificar si el stock del producto es suficiente para agregarlo al carrito.
        if (product.stock - 1 < 0) {
            throw new Error("El producto no cuenta con el stock suficiente.");
        }

        // Actualizar la cantidad del producto en el carrito o agregarlo si no está presente.
        this.#carts.map((c) => {
            return c.id == cid
                ? c.products.some((p) => p.product == pid)
                    ? c.products.map((p) => p.product == pid && p.quantity++)
                    : c.products.push({ product: parseInt(pid), quantity: 1 })
                : c;
        });

        // Guardar el carrito actualizado en el archivo JSON.
        await writeFile(this.#path, JSON.stringify(this.#carts, null, "\t"));

        // Devolver el carrito actualizado.
        return this.#carts.filter((c) => c.id == cid);
    };

    // Método para verificar si un carrito existe.
    cartExists = async (cid) => {
        await this.#loadCarts(); // Cargar carritos existentes desde el archivo

        // Verificar si el parámetro cid es un número.
        if (!cid || isNaN(cid)) {
            throw new Error(`El cid es ${cid}, cuando debería ser un int`);
        }

        // Verificar si existe un carrito con el ID especificado.
        const existsCart = this.#carts.some((c) => c.id == cid);
        if (!existsCart) {
            throw new Error(`No existe el cart con id ${cid}`);
        }
    };

    // Método privado para cargar los carritos desde el archivo.
    #loadCarts = async () => {
        try {
            // Leer y parsear los carritos desde el archivo JSON.
            this.#carts = JSON.parse(await readFile(this.#path, "utf-8"));
        } catch {
            // En caso de error al leer el archivo, inicializar el array de carritos vacío.
            this.#carts = [];
        }
    };
}

// Crear una instancia de CartManager y exportarla como módulo.
const cartManager = new CartManager();
export default cartManager;