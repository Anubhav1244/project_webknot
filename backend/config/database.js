const mongoose = require('mongoose');

exports.dbconnect=()=>{
    mongoose.connect('mongodb://localhost:27017/webkont', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected to database');
    })
    .catch((err)=>{
        console.log('Error connecting to database', err);
    });
}