import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' })); // en producción, restringe el origen

// Conexión usando variables de entorno (las pondrás en Railway)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/api/propiedades', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, ubicacion, valor_eur, tokens_totales FROM propiedades');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
});

// Endpoint ejemplo para comprar tokens (debe implementarse la lógica real)
app.post('/api/comprar', async (req, res) => {
  // recibir { userId, propiedadId, cantidadTokens }
  // aquí validaciones, transacciones DB, balance, registro de operación...
  res.json({ ok: true, message: 'Compra simulada (demo)' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en ${PORT}`));
