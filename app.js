const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

// development section
const app = express();
app.use(morgan('short'))
app.use(function(req, res, next){
  console.log("REQUEST IP: " + req.url);
  console.log("REQUEST DATE: " + new Date());
  next();
})
app.use(function(req, res, next){
  const filepath = path.join(__dirname, "hope", req.url);
  // getting info about a file
  fs.stat(filepath, function(err, fileInfo){
    if(err){
      next();
      return
    }
    if(fileInfo.isFile()){
      res.sendFile(filepath)
    }else{
      next();
    }
  });
});
app.use(function(req, res){
  res.status(404);
  res.send('file not found')
})
// listening port
http.createServer(app).listen(7000, function(){
  console.log('app running on port 7000')
})
