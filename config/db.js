const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_LOCAL);   
        // console.log(`db is connected ${conn.connection.host}`.brightBlue);
        console.log(`db is connected ${conn.connection.host}`.brightMagenta.bold.underline);
        
    } catch (error) {
        console.log("Timeout cannot connect to db".brightRed)
    }
}


module.exports = connectDB;