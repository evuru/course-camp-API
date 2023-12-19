const express = require("express");
const {getBootCamps,getBootCamp,createBootCamp,updateBootCamp,deleteBootCamp,deleteBootCamps, getBootCampsInRadius} = require("../controllers/bootcamps");

// include other resource routers
const courseRouter = require('./courses');


const router = express.Router();
//Reroute into other resource routers
router.use('/:bootcampId/courses',courseRouter);


router.route("/").get(getBootCamps).post(createBootCamp).delete(deleteBootCamps);
router.route("/:id").get(getBootCamp).put(updateBootCamp).delete(deleteBootCamp);
router.route("/radius/:zipcode/:distance").get(getBootCampsInRadius);

//Courses with bootcamp id
// router.route("/:bootcampId/courses").get(getCourses);



module.exports = router;
