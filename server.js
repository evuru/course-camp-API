const express = require('express');
const dotenv = require('dotenv').config({path:"./config/config.env"});
const colors = require("colors");

const errorHandler = require('./middleware/error');

// Connect to DB
const connectDB = require("./config/db");
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

const app = express();
// Body parser, reading data from body into req.body
app.use(express.json());
const port = process.env.PORT || 4000;
const environment = process.env.NODE_ENV;

//Mount Routers
app.use("/api/v1/bootcamps",bootcamps);
app.use("/api/v1/courses",courses);
app.use(errorHandler);

const server = app.listen(port,()=>{console.log(`Server is running in ${environment} mode listening on port ${port}...`.blue.bold.italic);})

// Handle Unhandled Promise Rejections

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error : ${err.message}`.red);
    //Close Server & exit process
    server.close(()=>process.exit);
});
