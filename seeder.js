const fs = require('fs');
const mongoose = require("mongoose");
const colors = require('colors');
//load env vars
const dotenv = require('dotenv').config({path:"./config/config.env"});

//load models
const BootcampDBmodel = require('./models/Bootcamp');
const CourseDBmodel = require('./models/Course');

//connect to db

mongoose.connect(process.env.DB_LOCAL);   
// console.log(`db is connected ${conn.connection.host}`.brightBlue);
console.log(`db is connected`.brightMagenta.bold.underline);

//Read json file
const bootcamps_data = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));
const courses_data = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'));

//import data to db
const importData  = async ()=>{
    try {
        await BootcampDBmodel.create(bootcamps_data);
        await CourseDBmodel.create(courses_data);
        console.log("bootcamps data inported".green.inverse);
        console.log("courses data inported".green.inverse);
        process.exit();
    } catch (error) {
        console.log("import failed       😥       "+error);
    }
}

const deleteAllBootcamps = async()=>{
    try {
        await BootcampDBmodel.deleteMany();
        await CourseDBmodel.deleteMany();
        console.log("bootcamps data destroyed".green.inverse);
        console.log("courses data destroyed".green.inverse);
        process.exit();
    } catch (error) {
        console.log("delete failed       😥       "+error);
    }
};


if(process.argv[2] === '--import'){
    importData();
}
if(process.argv[2] === '--del'){
    deleteAllBootcamps();
}