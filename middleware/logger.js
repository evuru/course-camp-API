//@desc     Logs requests to console
// custom logging middleware just trying stuff
const logger = (req,res,next)=>{
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.url}`);
    next();
}


module.exports = logger;