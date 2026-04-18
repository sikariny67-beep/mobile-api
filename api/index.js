const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// เชื่อมต่อ MongoDB (กูแก้ลิงก์ใส่ User/Pass ของมึงให้แล้ว)
const mongoURI = "mongodb+srv://sikarin:yCy9_Yv4LVGXjKa@cluster0.vgyi9bg.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// สร้าง Model สำหรับเก็บข้อมูล (สมมติว่าเป็นสถานที่ท่องเที่ยวแบบที่มึงทำใน Flutter)
const Attraction = mongoose.model('Attraction', {
    name: String,
    detail: String,
    coverimage: String
});

// แก้จาก app.get('/api/attractions', ...) เป็นแบบนี้:
app.get('/attractions', async (req, res) => { 
    const data = await Attraction.find();
    res.json(data);
});

// แก้จาก app.post('/api/attractions', ...) เป็นแบบนี้:
app.post('/attractions', async (req, res) => {
    const newItem = new Attraction(req.body);
    await newItem.save();
    res.status(201).json(newItem);
});

// หน้าแรกเอาไว้เช็คว่า API รันติดไหม
app.get('/', (req, res) => res.send('API ของศิครินทร์ Online แล้วจ้า!'));

module.exports = app;