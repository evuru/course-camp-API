const express = require('express');
const dotenv = require('dotenv').config({path:"./config/config.env"});
const connectDB = require('./config/db');
const colors = require('colors');
//routes
const bootcamps = require("./routes/bootcamps");
//middlewares
const logger = require("./middleware/logger");
const morgan = require("morgan");
//cconnect to db
connectDB();

const app = express();
const port = process.env.PORT || 4000;
const environment = process.env.NODE_ENV;
//Dev logging middleware
if(environment==='development'){
    app.use(logger);
    app.use(morgan('dev'));

}


// app.use(express.json()); //middleware for parsing json body from request
//mount routers
app.use('/api/v1/bootcamps',bootcamps);



const server = app.listen(port,()=>{console.log(`Server is running in ${environment} mode listening on port ${port}...`.blue.bold);})

//Handle unhandled Promise Rejections

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & Exit process
    server.close(()=>{process.exit(1)});

})


