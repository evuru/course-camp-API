const express = require('express');
const dotenv = require('dotenv').config({path:"./config/config.env"});

const app = express();
const port = process.env.PORT || 4000;
const environment = process.env.NODE_ENV;

app.listen(port,()=>{console.log(`Server is running in ${environment} mode listening on port ${port}...`);})


