require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require ('express-handlebars');
const bodyparser = require('body-parser');
const port = process.env.PORT || 3000;

const employeController = require('./controller/employeeController');

var app = express();
app.use(bodyparser.urlencoded({
  extended:true
}));
app.set('views',path.join(__dirname,'/views'));

app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname + '/views/layouts/'}));
app.set('view engine','hbs');
app.listen(port, ()=>{
  console.log(`Server is start on port: ${port}`);
});
app.use('/employee', employeController);
