
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();

// MongoDB Atlas connection string from environment variables
const mongoUrl = process.env.MONGO_URL;

// Connect to MongoDB Atlas
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log(err));

const app = express();
app.use(bodyParser.json());

// Define a simple schema for demonstration
const dataSchema = new mongoose.Schema({
  data: String
});
const DataModel = mongoose.model('Data', dataSchema);

// POST endpoint to add data to MongoDB
app.post('/add', async (req, res) => {
    try {
        const newData = new DataModel({ data: req.body.data });
        const savedData = await newData.save();
        res.json(savedData);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// GET endpoint to fetch data from MongoDB
app.get('/fetch', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// PATCH endpoint to update data in MongoDB
app.patch('/update', async (req, res) => {
    try {
        const updatedData = await DataModel.findByIdAndUpdate(req.body.id, { data: req.body.newData }, { new: true });
        res.json(updatedData);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// PUT endpoint to update data in MongoDB
app.put('/update/:id', async (req, res) => {
    try {
        const updatedData = await DataModel.findByIdAndUpdate(req.params.id, { data: req.body.data }, { new: true });
        res.json(updatedData);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


// DELETE endpoint to delete data from MongoDB
app.delete('/delete', async (req, res) => {
    try {
        const deletedData = await DataModel.findByIdAndDelete(req.body.id);
        res.json(deletedData);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
