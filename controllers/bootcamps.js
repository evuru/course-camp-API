const BootcampcustomMiddleware =  require ("../middleware/bootcamp-middleware");
const Bootcamp = require("../models/bootcamp");

//@desc     Get all bootcamps
//@route    Get /api/v1/bootcamps
//@access   Public
exports.getBootCamps = (req,res,next)=>{
    const bootCampRoute = new BootcampcustomMiddleware(req.method,req.url);
    res.status(200).json({success:true,data :bootCampRoute.getBootCamps()});

}

//@desc     Get single bootcamp
//@route    Get /api/v1/bootcamps/:id
//@access   Public
exports.getBootCamp = (req,res,next)=>{
    res.status(200).json({success:true,msg :`get bootcamp ${req.params.id}`});

}

//@desc     Create new bootcamp
//@route    Post /api/v1/bootcamps
//@access   Private
exports.createBootCamp = (req,res,next)=>{
    res.status(200).json({success:true,msg :"Create new bootcamp"});

}


//@desc     Update bootcamp
//@route    Put /api/v1/bootcamp/:id
//@access   Private
exports.updateBootCamp = (req,res,next)=>{
    const bootCampRoute = new Bootcamp(req.method,req.url);
    res.status(200).json({success:true,msg :`update bootcamp ${req.params.id}`});

}


//@desc     Delete bootcamp
//@route    Delete /api/v1/bootcamp/:id
//@access   Private
exports.deleteBootCamp = (req,res,next)=>{
    res.status(200).json({success:true,msg :`Delete bootcamp ${req.params.id}`});

}

//@desc     Delete bootcamp
//@route    Delete /api/v1/bootcamps
//@access   Private
exports.deleteBootCamps = (req,res,next)=>{
    res.status(400).json({success:true,msg :"delete all bootcamps"});

}