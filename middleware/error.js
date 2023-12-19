const ErrorResponse = require("../utils/errorResponse");

const errorHandler=(err,req,res,next)=>{
    let error = {...err};
    error.message = err.message;
    //log to console for the developer
    // console.log(err.stack.red);

    //Mongoose bad ObjectID
    // console.log(err.name);// console.log(err.value);
    if(err.name == "CastError"){
        // console.log(error);
        // console.log(error.model.modelName);
        const message = `${error.model.modelName} not found with id: ${err.value}`;
        error = new ErrorResponse(message,404);
    }
    // Mongoose duplicate key
    if(err.code ===11000){
        const message = `Duplicate field value '${err.keyValue.name}' already exists`;
        error = new ErrorResponse(message,400);
    }
    // Mongoose Validation error
    if(err.name==="ValidationError"){
        // const message = `Duplicate field value '${err.keyValue.name}' already exists`;
        const message = Object.values(err.errors).map((val)=> val.message);
        error = new ErrorResponse(message,400);
    }
console.log(error.statusCode);
    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || "Server Error"
    });
}

module.exports = errorHandler;