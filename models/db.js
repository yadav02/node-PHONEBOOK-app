const mongoose = require('mongoose');

mongoose.connect('add Database',(err)=>{
    if(!err){console.log('MongoDB Connection Succeeded.');
    }else
    console.log(`Error in DB Connection:${err}`);
});
require('./employee');
