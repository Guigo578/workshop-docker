const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
  connectionTimeoutMillis: 2000
});

app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    const client = await pool.connect();
    await client.query('SELECT 1 AS status');
    dbStatus = 'connected';
    client.release();
  } catch (err) {
    console.log("Banco não encontrado ou credenciais inválidas:", err.message);
  }
  res.json({ status: 'ok', database: dbStatus });
});

const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
  console.log(`Aguardando conexão com o banco em: ${process.env.DB_HOST}`);
});