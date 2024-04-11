// Importar el módulo 'multer' para el manejo de carga de archivos.
import multer from "multer";

// Configurar el almacenamiento de archivos usando multer.diskStorage
const storage = multer.diskStorage({
    // Especificar el directorio de destino donde se guardarán los archivos.
    destination: function (req, file, cb) {
        cb(null, "./public/assets"); // Directorio donde se guardarán los archivos subidos.
    },
    // Especificar el nombre de archivo que se guardará.
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Usar el nombre original del archivo.
    }
});

// Exportar un middleware de multer configurado con el almacenamiento definido arriba.
export const uploader = multer({ storage });