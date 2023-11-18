const express = require('express');
const router = express.Router();
const {getBootCamps,getBootCamp,createBootCamp,deleteBootCamp,deleteBootCamps, updateBootCamp}= require("../controllers/bootcamps");

router.route("/").get(getBootCamps).post(createBootCamp);
router.route("/:id").get(getBootCamp).put(updateBootCamp).delete(deleteBootCamp);

// router.get('/',(req, res)=>{
//     return getBootCamps
// });
// router.get('/:id',(req, res)=>{
//     return getBootCamp(req,res);
// });
// router.post('/',(req, res)=>{
//     return createBootCamp(req,res);
// });
// router.put('/:id',(req, res)=>{
//     return updateBootCamp(req,res);
// });
// router.delete('/',(req, res)=>{
//     return deleteBootCamps(req,res);
// });
// router.delete('/:id',(req, res)=>{
//     return deleteBootCamp(req,res);
// });

module.exports = router;