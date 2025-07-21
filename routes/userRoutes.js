// routes/userRoutes.js
const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const { protect } = require('../middleware/auth.middleware');

// Registrar nuevo usuario
router.post('/register', registerUser);

// Iniciar sesión
router.post('/login', loginUser);

// Obtener perfil del usuario autenticado
router.get('/profile', protect, getProfile);

// Verificar token y obtener perfil
router.get('/verifytoken', protect, getProfile);

// Actualizar datos del usuario autenticado
router.put('/update', protect, updateUser);

// Eliminar usuario autenticado
router.delete('/delete', protect, deleteUser);

module.exports = router;
