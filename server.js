const express = require('express')
const app = express();
const db = require('./db');

require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // req.body
const PORT = process.env.PORT || 3000


app.get('/', (req, res)=>{
    res.send("Welcome to voting application")
})


// Import Routes 
const userRouter = require('./Routes/userRouting');
const candidateRouter = require('./Routes/candidateRouting');


// USe the routes
app.use('/user', userRouter);
app.use('/candidate', candidateRouter);


// Port is odne 
app.listen(PORT, ()=>{
    console.log("Server is running ..")
})