const express = require('express');
const menuRoutes = require('./routes/menuRoutes')
const cors = require('cors');
const connectDB = require('./config/db')
const port = 4000;

const app = express();
connectDB();

app.use(express.json());
app.use(cors());



app.use('/menu',menuRoutes);


app.listen(port,(error)=>{
    if(!error){
        console.log(`server running on port ${port}`);
    }
    else{
        console.log(`Error :`+ error);
    }
})