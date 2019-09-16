const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/',(req, res)=>{
  res.render("employee/addOrEdit",{
    viewTitle:"Create Contact"
  });
});
router.post('/',(req, res)=>{
  if (req.body._id=='')
     insertRecord(req,res);
     else
     updateRecord(req,res);

});
function insertRecord(req, res){
  var employee = new Employee();
  employee.fullName=req.body.fullName;
  employee.mobile = req.body.mobile;
  employee.email=req.body.email;
  employee.company=req.body.company;
  employee.save((err,doc)=>{
    if (!err) {
      res.redirect('employee/list');
    }else {
      if (err.name === 'ValidationError') {
        handleValiadationError(err,req.body);
        res.render("employee/addOrEdit",{
          viewTitle:"Create Conact",
          employee:req.body
        });
      }
      console.log(`Error during record insertion:${err}`);
    }
  });
}
function updateRecord(req,res){
  Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
    if (!err) { res.redirect('employee/list');}
    else {
      if (err.name == 'ValidationError') {
        handleValiadationError(err ,req.body);
        res.render("employee/addOrEdit",{
          viewTitle:'Update Contact',
          employee:req.body
        });
      }
      else {
        console.log(`Error during record update: ${err}`);
      }
    }
  });
}
router.get('/list',(req, res)=>{
  Employee.find((err ,docs)=>{
  if (!err) {
    res.render("employee/list",{
      list: docs
    });
    }
    else {
      console.log(`Error in retrieving contact list:${err}`);
    }
  });
});
function handleValiadationError(err, body){
  for(field in err.errors)
  {
    switch(err.errors[field].path){
          case 'fullName':
            body['fullNameError']=err.errors[field].message;
            break;
          case 'mobile':
                body['mobileError']=err.errors[field].message;
                break;
           case 'email':
              body['emailError']=err.errors[field].message;
              break;
              default:
              break;
    }
  }
}
router.get('/:id',(req, res)=>{
  Employee.findById(req.params.id, (err, doc)=>{
    if(!err){
      res.render("employee/addOrEdit",{
        viewTitle:"Update Contact",
        employee:doc
      });
    }

  });

});
router.get('/delete/:id',(req, res)=>{
  Employee.findByIdAndRemove(req.params.id,(err, doc)=>{
    if (!err) {
      res.redirect('/employee/list');
    }else {
      console.log(`Error in conect delete: ${err}`);}
  });
});
module.exports=router;
