// routes/productRoutes.js
const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { protect } = require('../middleware/auth.middleware');

// Crear un producto (requiere login)
router.post('/create', protect, createProduct);

// Obtener todos los productos (público)
router.get('/readall', getAllProducts);
router.get('/', getAllProducts); // ✅ ahora también responde en /api/products

// Obtener un producto por ID (público)
router.get('/readone/:id', getProductById);

// Actualizar un producto (solo dueño)
router.put('/update/:id', protect, updateProduct);

// Eliminar un producto (solo dueño)
router.delete('/delete/:id', protect, deleteProduct);

module.exports = router;
