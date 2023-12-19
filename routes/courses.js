const express = require("express");
const {getCourses,getCourse,createCourse,updateCourse,deleteCourse,deleteCourses} = require("../controllers/courses");
const router = express.Router({mergeParams:true});


router.route("/").get(getCourses).post(createCourse).delete(deleteCourses);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);
// router.route("/radius/:zipcode/:distance").get(getCoursesInRadius);



module.exports = router;
