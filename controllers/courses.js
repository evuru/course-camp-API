const CourseDBmodel = require('../models/Course');
const BootcampDBmodel = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


//@desc     Get all courses
//@route    Get /api/v1/bootcamps/:bootcampId/courses
//@route    Get /api/v1/courses
//@access   Public
exports.getCourses = asyncHandler( async(req,res,next)=>{
    let query;
    if(req.params.bootcampId){
        query=CourseDBmodel.find({bootcamp: req.params.bootcampId});
        console.log(req.params.bootcampId);
    }else{
        console.log(req.params);
        query=CourseDBmodel.find().populate({path:'bootcamp',select:'name description'});
    }
    const courses = await query
    res.status(200).json({success:true, count: courses.length, data:courses});
});





//@desc     Get single course
//@route    Get /api/v1/courses/:id
//@access   Public
exports.getCourse = asyncHandler( async(req,res,next)=>{
    const id = req.params.id;
    const course = await CourseDBmodel.findById(id).populate({path : 'bootcamp',select : 'name description'});
    if(!course){
        return next(new ErrorResponse(`No course with the ID of ${id}`,404));
    }
    res.status(200).json({success: true,data:course});
});


//@desc     Create new course
//@route    Post /api/v1/bootcamps/:bootcampId/courses
//@access   Public
exports.createCourse = asyncHandler( async(req,res,next)=>{
    // const createCourse = await CourseDBmodel.create(req.body);
    // res.status(200).json({success: true, data: createCourse});
    // Make sure user is bootcamp owner
    // if (req.user.role !== 'admin') {
    //     req.body.bootcamp = req.params.bootcampId;
    //     }
    //     req.body.user = req.user.id;
    req.body.bootcamp= req.params.bootcampId;
    const bootcamp = await BootcampDBmodel.findById(req.body.bootcamp);
    if(!bootcamp){
        return next(new ErrorResponse(`Can't add course to unknown bootcamp, Bootcamp does not exist id: ${req.params.bootcampId}`,404));
    }
    const createCourse = await CourseDBmodel.create(req.body);
    res.status(200).json({success: true, data: createCourse});
});


//@desc     Update course
//@route    Put /api/v1/bootcamps/:bootcampId/courses/:id
//@access   Public
exports.updateCourse = asyncHandler( async(req,res,next)=>{
    const id = req.params.id;
    console.log(id);
    const updateCourse = await CourseDBmodel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
    if(!updateCourse){
        return next(new ErrorResponse(`Update failed, Course not found with id: ${req.params.id}`,404));
    }
    res.status(200).json({success:true,updateCourse});
});

//@desc     Delete single course
//@route    Delete /api/v1/bootcamps/:bootcampId/courses/:id
//@access   Public
exports.deleteCourse = asyncHandler( async(req,res,next)=>{
    const deleteCourse = await CourseDBmodel.findByIdAndDelete(req.params.id);
    if(!deleteCourse){
        return next(new ErrorResponse(`Delete failed, Course not found with id: ${req.params.id}`,404));
    }
    res.status(200).json({success:true,msg :`Deleted course ${req.params.id}`});

});


//@desc     Delete all courses
//@route    Delete /api/v1/bootcamps/:bootcampId/courses
//@access   Public
exports.deleteCourses = asyncHandler( async(req,res,next)=>{
    res.status(200).json(await CourseDBmodel.find());
});
