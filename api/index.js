const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// เชื่อมต่อ MongoDB (ลิงก์ของมึง)
const mongoURI = "mongodb+srv://sikarin:yCy9_Yv4LVGXjKa@cluster0.vgyi9bg.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// สร้าง Model
const Attraction = mongoose.model('Attraction', {
    name: String,
    detail: String,
    coverimage: String
});

// แก้ทางเดินให้ตรงกับที่ Vercel เรียกมา
app.get('/api/attractions', async (req, res) => {
    const data = await Attraction.find();
    res.json(data);
});

// หน้าเช็คสถานะ (ทางเดินหลักของ Vercel)
app.get('/api', (req, res) => {
    res.send('API ของศิครินทร์ Online 100% แล้วครับเพื่อน!');
});

module.exports = app;