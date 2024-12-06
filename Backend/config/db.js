const mongoose = require('mongoose');
require('dotenv').config();



const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.c86tm.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`

const connectDB=()=>{
    mongoose.connect(dbUri)
    .then(()=>{
        console.log('MongoDB connected...');
    }).catch((err)=>{
        console.error('Error connecting to MongoDB',err.message);
    });
}

module.exports=connectDB;