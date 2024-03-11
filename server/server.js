const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://anikbmsit:<password>@mystudcluster.hbjoaiv.mongodb.net/mystud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the student schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  totalMarks: Number,
  grades: String,
});

const Student = mongoose.model('Student', studentSchema);

// API endpoint to insert a new student
app.post('/students', async (req, res) => {
  try {
    const { name, totalMarks, grades } = req.body;
    const newStudent = new Student({ name, totalMarks, grades });
    const savedStudent = await newStudent.save();
    res.json(savedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
