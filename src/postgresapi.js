const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const tableName = process.env.DB_TABLE_NAME || 'your_table';

const app = express();
app.use(bodyParser.json());

// Define a simple schema for demonstration
const dataSchema = {
  name: 'varchar',
  email: 'varchar',
  mobilenumber: 'varchar',
  country: 'varchar',
  state: 'varchar',
  city: 'varchar',
  area: 'varchar',
  venue: 'varchar',
  ideas: 'varchar',
};

// POST endpoint to receive data and add to PostgreSQL
app.post('/add', async (req, res) => {
  try {
    const newData = req.body;
    const fields = Object.keys(newData).join(', ');
    const values = Object.values(newData);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    const addQuery = `INSERT INTO ${tableName} (${fields}) VALUES (${placeholders}) RETURNING *`;

    const response = await pool.query(addQuery, values);
    res.json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET endpoint to retrieve data from PostgreSQL
app.get('/fetch', async (req, res) => {
  try {
    const fetchQuery = `SELECT * FROM ${tableName}`;
    const response = await pool.query(fetchQuery);
    res.json(response.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH endpoint to update data in PostgreSQL
app.patch('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updateQuery = `UPDATE ${tableName} SET ${Object.keys(newData).map((field, i) => `${field} = $${i + 1}`).join(', ')} WHERE id = $${Object.keys(newData).length + 1} RETURNING *`;

    const response = await pool.query(updateQuery, [...Object.values(newData), id]);
    res.json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT endpoint to update data in PostgreSQL
app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updateQuery = `UPDATE ${tableName} SET ${Object.keys(newData).map((field, i) => `${field} = $${i + 1}`).join(', ')} WHERE id = $${Object.keys(newData).length + 1} RETURNING *`;

    const response = await pool.query(updateQuery, [...Object.values(newData), id]);
    res.json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE endpoint to delete data from PostgreSQL
app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;
    const response = await pool.query(deleteQuery, [id]);
    res.json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
