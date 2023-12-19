// const BootcampcustomMiddleware =  require ("../middleware/bootcamp-middleware");
const BootcampDBmodel = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
//for getting courses within a radius
const geocoder = require('../utils/geocoder');

//@desc     Get all bootcamps
//@route    Get /api/v1/bootcamps
//@access   Public
exports.getBootCamps = asyncHandler(async (req,res,next)=>{
    console.log(req.query);
    let query;
    //copy request.query
    const reqQuery = {...req.query};
    //Fields to exclude from match
    const removeFields = ['select','sort','limit','page'];

    //loop through removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    //create query string
    let queryStr = JSON.stringify(reqQuery);
    //create operators ($gt, $gte, etc);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);
    console.log(queryStr);

    //Finding resource
    query = BootcampDBmodel.find(JSON.parse(queryStr)).populate({path:'courses',select:'title description minimumSkill'});

    //Select
    if(req.query.select){
        fields = (req.query.select).replace(',',' ');
        // fields = (req.query.select).split(',').join(' ');
        // let boots = bootcamps.map(bootcamp=>[bootcamp.name,bootcamp.description]);
        // console.log(boots);
        console.log(fields);
        query.select(fields);
    }

    //Sort
    if(req.query.sort){
        const sortBy = (req.query.sort).replace(',',' ');
        query.sort(sortBy);
    }else{
        query.sort('-createdAt')
    }

    //Pagination
    // if(req.query.page){
        const page = parseInt(req.query.page,10) || 1;
        const limit = parseInt(req.query.limit,10) || 25;
        const startIndex = (page - 1)*limit;
        const endIndex = page * limit;
        const total = await BootcampDBmodel.countDocuments();

        // query = query.skip(skip).limit(limit);
        query = query.skip(startIndex).limit(limit);
        console.log("page "+page+" skip=>"+startIndex);
    // }

    //Executing query
    const bootcamps = await query;

    //Pagination result
    const pagination = {};
    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0){
        pagination.prev = {
            page: page - 1,
            limit
        }
    }


    res.status(200).json({success:true, count:bootcamps.length, pagination, bootcamps});

    // res.status(404).json({success:false,data :"No bootcamp found"});
});

//@desc     Get single bootcamp
//@route    Get /api/v1/bootcamps/:id
//@access   Public
exports.getBootCamp = asyncHandler(async (req,res,next)=>{
    const id = req.params.id
    console.log(req.query);
        const bootcamp = await BootcampDBmodel.findById(id);
        //check if id is properly formatted and doesn't exist
        if(!bootcamp){
            //res.status(400).json({success:false,msg :`bootcamp does not exist`});
            //to prevent => "Error : Cannot set headers after they are sent to the client"
            // return;
            // return  next(new errorResponse(`Bootcamp not found with id==>${id}`,404));
            return next(new ErrorResponse(`Uknown Bootcamp not found with id: ${req.params.id}`,404));

        }
       return res.status(200).json({success:true, bootcamp});

});

//@desc     Create new bootcamp
//@route    Post /api/v1/bootcamps
//@access   Private
exports.createBootCamp = asyncHandler(async (req,res,next)=>{
    const createBootcamp = await BootcampDBmodel.create(req.body);
    res.status(201).json({success:true,data :createBootcamp});
});


//@desc     Update bootcamp
//@route    Put /api/v1/bootcamp/:id
//@access   Private
exports.updateBootCamp = asyncHandler(async(req,res,next)=>{
    const updateBootCamp = await BootcampDBmodel.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true});
    if(!updateBootCamp){
        // res.status(400).json({success:false,msg :`Bootcamp not updated`});
        return next(new ErrorResponse(`Update failed on unknown Bootcamp, not found with id: ${req.params.id}`,404));
    }
    res.status(200).json({success:true,updateBootCamp});

});

//@desc     Delete bootcamp
//@route    Delete /api/v1/bootcamp/:id
//@access   Private
exports.deleteBootCamp = asyncHandler(async(req,res,next)=>{
    const deleteBootCamp = await BootcampDBmodel.findByIdAndDelete(req.params.id);
    if(!deleteBootCamp){
        // res.status(404).json({success:true,msg :`Bootcamp not found`});
        // return;
        return next(new ErrorResponse(`Delete failed on unknown Bootcamp, not found with id: ${req.params.id}`,404));

    }
    res.status(200).json({success:true,msg :`Deleted bootcamp ${req.params.id}`});
});



//@desc     Get all bootcamps within a radius
//@route    Get /api/v1/bootcamps/radius/:zipcode/:distance
//@access   Public
exports.getBootCampsInRadius = asyncHandler(async (req,res,next)=>{
    console.log(req.query);
    

    const {zipcode,distance} = req.params;
    const loc= await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //calculateradius using radians
    //divide distance by radius of earth ---earth radius =  3,963 mi or 6,378 km
    const radius = distance/3963;

    // lat and long from geocoder
    const bootcamps = await BootcampDBmodel.find({
        location:{$geoWithin :{$centerSphere:[[lng,lat],radius]}}
            });

    res.status(200).json({success:true, count:bootcamps.length, bootcamps});

    // res.status(404).json({success:false,data :"No bootcamp found"});
});



//@desc     Delete bootcamp
//@route    Delete /api/v1/bootcamps
//@access   Private
exports.deleteBootCamps = asyncHandler(async(req,res,next)=>{
    const deleteAllBootcamps = await BootcampDBmodel.deleteMany();
    // res.status(400).json({success:true,msg :"delete all bootcamps"});
    if(!deleteAllBootcamps){
        return next(new ErrorResponse(`Delete failed all bootcamps`,404));

    }
    res.status(200).json({success:true,msg :`Deleted all bootcamps`});

});

// I'm catching cause app might receive wrongly formatted ID.