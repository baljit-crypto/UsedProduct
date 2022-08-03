const mongoose = require('mongoose');

const dbURI ="mongodb+srv://baljit:baljit123@cluster0.uoltt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const dbURI = "mongodb+srv://baljit:baljit123@cluster0.uoltt.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI,{
    dbName: 'UsedProducts',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () =>{
    console.log(`Mongoose connected to ${dbURI}`);
})


mongoose.connection.on('error', err =>{
    console.log('Mongoose connection error:', err);
})


mongoose.connection.on('disconnected', () =>{
    console.log(`Mongoose disconnected`);
})


require('./product');
require('./user');


