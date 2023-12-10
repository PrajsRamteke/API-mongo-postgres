const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require("dotenv");
dotenv.config();

// Configure PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Set variables based on environment variables
const tableName = process.env.DB_TABLE_NAME || 'your_table';
const dataField = process.env.DB_DATA_FIELD || 'data_field';

const app = express();
app.use(bodyParser.json());

// POST endpoint to receive data and add to PostgreSQL
app.post('/add', async (req, res) => {
    try {
        const { data } = req.body;
        const addQuery = `INSERT INTO ${tableName} (${dataField}) VALUES ($1) RETURNING *`;
        const response = await pool.query(addQuery, [data]);
        res.json(response.rows[0]);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// GET endpoint to retrieve data from PostgresSQL
app.get('/fetch', async (req, res) => {
    try {
        const fetchQuery = `SELECT * FROM ${tableName}`;
        const response = await pool.query(fetchQuery);
        res.json(response.rows);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// PATCH endpoint to update data in PostgreSQL
app.patch('/update', async (req, res) => {
    try {
        const { id, newData } = req.body;
        const updateQuery = `UPDATE ${tableName} SET ${dataField} = $1 WHERE id = $2 RETURNING *`;
        const response = await pool.query(updateQuery, [newData, id]);
        res.json(response.rows[0]);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// PUT endpoint to update data in PostgreSQL
app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { newData } = req.body;
        const updateQuery = `UPDATE ${tableName} SET ${dataField} = $1 WHERE id = $2 RETURNING *`;
        const response = await pool.query(updateQuery, [newData, id]);
        res.json(response.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// DELETE endpoint to delete data from PostgreSQL
app.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        const deleteQuery = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;
        const response = await pool.query(deleteQuery, [id]);
        res.json(response.rows[0]);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
