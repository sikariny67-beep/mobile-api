const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ลิงก์ MongoDB ของมึง
const mongoURI = "mongodb+srv://sikarin:yCy9_Yv4LVGXjKa@cluster0.vgyi9bg.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI).then(() => console.log('DB Connected'));

const Attraction = mongoose.model('Attraction', {
    name: String,
    detail: String,
    coverimage: String
});

// ดักจับทุกอย่างที่ส่งมาหา /api/...
app.get('/api/attractions', async (req, res) => {
    const data = await Attraction.find();
    res.json(data);
});

// หน้าเช็คสถานะ
app.get('/api', (req, res) => {
    res.send('API สถานะ: พร้อมใช้งาน 100% (Sikharin Yonpaph)');
});

module.exports = app;