// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// Obtener carrito
router.get('/', protect, getCart);

// Agregar producto al carrito
router.post('/add', protect, addToCart);

// ❗ Eliminar un producto específico del carrito
router.delete('/remove/:productId', protect, removeFromCart);

// Vaciar carrito completamente
router.delete('/clear', protect, clearCart);

module.exports = router;
