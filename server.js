// server.js
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require("./routes/checkoutRoutes");

const app = express();

// Cargar documentación Swagger
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

// Middlewares globales
app.use(cors());
app.use(express.json());

// Documentación Swagger en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Usar rutas
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);

app.use('/api/cart', cartRoutes);

app.use("/api/checkout", checkoutRoutes);

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('🧠 API de Proyecto Módulo 6 funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📘 Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});
