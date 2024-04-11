// Importar funciones para manejar archivos del sistema y resolver rutas.
import { writeFile, readFile } from "fs/promises";
import { resolve } from "path";

// Definir la clase ProductManager para manejar productos.
class ProductManager {
    #products; // Array privado para almacenar los productos.
    #path; // Ruta al archivo JSON que guarda los datos de los productos.

    // Constructor que inicializa la ruta del archivo y el array de productos.
    constructor() {
        this.#path = resolve("./src/data/products.json"); // Ruta del archivo de productos.
        this.#products = []; // Inicializar el array de productos vacío.
    }

    // Método para agregar un nuevo producto.
    addProduct = async (product) => {
        await this.#loadProducts(); // Cargar productos existentes desde el archivo.

        // Validar los datos del producto antes de agregarlo.
        // Se verifica si los campos obligatorios son strings y si los campos numéricos son números.
        // Se establecen valores por defecto para campos opcionales que no estén definidos.

        // Generar un nuevo ID para el producto.
        const id = Math.max(...this.#products.map((p) => p.id)) + 1 ?? 1;

        // Crear un nuevo producto con el ID generado y los datos proporcionados.
        const newProduct = { id: id == -Infinity ? 1 : id, ...product };

        // Agregar el nuevo producto al array de productos.
        this.#products.push(newProduct);

        // Guardar el array actualizado en el archivo JSON.
        await writeFile(this.#path, JSON.stringify(this.#products, null, "\t"));

        // Devolver el nuevo producto creado.
        return newProduct;
    };

    // Método para obtener todos los productos.
    getProducts = async () => {
        await this.#loadProducts(); // Cargar productos existentes desde el archivo.

        // Devolver todos los productos.
        return this.#products;
    };

    // Método para obtener un producto por su ID.
    getProductById = async (pid) => {
        await this.productExists(pid); // Verificar si el producto existe.

        // Buscar y devolver el producto con el ID especificado.
        return this.#products.find((p) => p.id == pid) ?? console.error(`Not found`);
    };

    // Método para actualizar un producto existente.
    updateProduct = async (product) => {
        await this.productExists(product.id); // Verificar si el producto existe.

        // Actualizar el producto con los datos proporcionados.
        // Se actualizan solo los campos definidos en el objeto 'product'.

        // Guardar el array actualizado en el archivo JSON.
        await writeFile(this.#path, JSON.stringify(this.#products, null, "\t"));

        // Devolver el producto actualizado.
        return this.#products.filter((p) => p.id == product.id);
    };

    // Método para eliminar un producto por su ID.
    deleteProduct = async (pid) => {
        await this.productExists(pid); // Verificar si el producto existe.

        // Filtrar el array de productos para eliminar el producto con el ID especificado.
        this.#products = this.#products.filter((p) => p.id != pid);

        // Guardar el array actualizado en el archivo JSON.
        await writeFile(this.#path, JSON.stringify(this.#products, null, "\t"));
    };

    // Método para verificar si un producto existe por su ID.
    productExists = async (pid) => {
        await this.#loadProducts(); // Cargar productos existentes desde el archivo.

        // Verificar si el parámetro pid es un número,
        // y si existe un producto con el ID especificado
        // (lanza un error si no existe).
    };

    // Método privado para cargar los productos desde el archivo.
    #loadProducts = async () => {
        try {
            // Leer y parsear los productos desde el archivo JSON.
            this.#products = JSON.parse(await readFile(this.#path, "utf-8"));
        } catch {
            // En caso de error al leer el archivo, inicializar el array de productos vacío.
            this.#products = [];
        }
    };
}

// Crear una instancia de ProductManager y exportarla como módulo.
const productManager = new ProductManager();
export default productManager;
