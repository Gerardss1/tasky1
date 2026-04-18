require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// conectar DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


const errorHandler = require('./middlewares/errorMiddleware');
app.use(errorHandler);