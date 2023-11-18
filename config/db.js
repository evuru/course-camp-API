const mongoose = require('mongoose');

const connectDB = async()=>{
    const conn = await mongoose.connect(process.env.DB_LOCAL);
     
    // console.log(`db is connected ${conn.connection.host}`.brightBlue);
    console.log(`db is connected ${conn.connection.host}`.brightMagenta.bold.underline);
}

module.exports = connectDB;