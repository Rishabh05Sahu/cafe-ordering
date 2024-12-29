const express = require('express');
const menuRoutes = require('./routes/menuRoutes')
const orderRoutes = require('./routes/orderRoutes')
const adminRoutes = require('./routes/adminRoutes')
const customerRoutes = require('./routes/customerRoutes')
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const port = 4000;

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



app.use('/menu',menuRoutes);
app.use('/order',orderRoutes);
app.use('/admin',adminRoutes);
app.use('/customers',customerRoutes);

app.listen(port,(error)=>{
    if(!error){
        console.log(`server running on port ${port}`);
    }
    else{
        console.log(`Error :`+ error);
    }
})