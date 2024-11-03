const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/messangerApp').then(()=>{
        console.log("connected to Mongo!");
    });
};

module.exports = connectDB;