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




const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/img', express.static('upload/img'))
app.post('/upload', upload.single('upload'), (req, res) => {
    res.json({
        success: 1,
        url: `http://localhost:${port}/img/${req.file.filename}`,
    })
})


app.use('/menu',menuRoutes);
app.use('/order',orderRoutes);
app.use('/admin',adminRoutes);
app.use('/customers',customerRoutes);
app.use('/table',tableRoutes)

app.listen(port,(error)=>{
    if(!error){
        console.log(`server running on port ${port}`);
    }
    else{
        console.log(`Error :`+ error);
    }
})