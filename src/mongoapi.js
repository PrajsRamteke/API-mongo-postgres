
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
  name: String,
  email: String,
  mobilenumber: String,
  country: String,
  state: String,
  city: String,
  area: String,
  venue: String,
  ideas: String
  
});
const DataModel = mongoose.model('Data', dataSchema);


app.post('/add', async (req, res) => {
    try {
        const newData = new DataModel({
            name: req.body.name,
            email: req.body.email,
            mobilenumber: req.body.mobilenumber,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            area: req.body.area,
            venue: req.body.venue,
            ideas: req.body.ideas
            // Make sure to add the rest of the fields here
        });

        const savedData = await newData.save();
        res.json({ message: 'Data added successfully'});
    } catch (error) {
        console.log(error); // Enhanced error logging
        res.status(400).json({ error: error.message });
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
app.patch('/update/:id', async (req, res) => {
    try {
        const updatedData = await DataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json(updatedData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT endpoint to update data in MongoDB
app.put('/update/:id', async (req, res) => {
    try {
        const updatedData = await DataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// DELETE endpoint to delete data from MongoDB
app.delete('/delete/:id', async (req, res) => {
    try {
        const deletedData = await DataModel.findByIdAndDelete(req.params.id);     
        if (!deletedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
