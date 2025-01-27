const express = require('express');
const menuRoutes = require('./routes/menuRoutes')
const orderRoutes = require('./routes/orderRoutes')
const adminRoutes = require('./routes/adminRoutes')
const customerRoutes = require('./routes/customerRoutes')
const tableRoutes = require('./routes/tabelRoutes')
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const upload = require('./middleware/upload');
const port = 4000;
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'))
app.post('/uploads', upload.single('image'), async(req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({ success: 0, error: "No file uploaded" });
    }
    const fileName = `${Date.now()}_${file.originalname}`;
    const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            cacheControl: '3600',
        });

    if (error) {
        console.error(error);
        return res.status(500).send({ success: 0, error: "Failed to upload file" });
    }

    // Generate public URL
    const { data: publicData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);
    res.json({
        success: 1,
        imageUrl: publicData.publicUrl,
    })
})


app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/customers', customerRoutes);
app.use('/table', tableRoutes)

app.listen(port, (error) => {
    if (!error) {
        console.log(`server running on port ${port}`);
    }
    else {
        console.log(`Error :` + error);
    }
})