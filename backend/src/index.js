const express = require('express');
const sequelize = require('./config/db');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// --- MIDDLEWARES ---
app.use(cors()); // Importante que esté arriba
app.use(express.json());

// --- RUTAS DE LA API ---
// Se eliminó la línea de authRoutes porque el archivo no existe
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/proveedores', proveedorRoutes);

// --- SERVIR FRONTEND (OPCIONAL) ---
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Servidor y Base de Datos listos.');
    app.listen(PORT, () => {
      console.log(`🚀 API corriendo en: http://localhost:${PORT}`);
    });
  })
  .catch(error => console.error('❌ Error de conexión:', error));
