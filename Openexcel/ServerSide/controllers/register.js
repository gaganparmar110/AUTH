var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../db');

module.exports.register=function(req,res){
  console.log("req",req.body);
  var encryptedString = cryptr.encrypt(req.body.data.password);
    var users={
        "name":req.body.data.name,
        "email":req.body.data.email,
        "password":encryptedString,
    }
    console.log("users",users);
    connection.query('SELECT * FROM user_record WHERE email = $1',[users.email], function (error, results, fields) {
       console.log("error1",error);
       console.log("error2",results.rowCount);
       console.log("error3",fields);
        if (error) {
            // console.log("error2",error);
            res.json({
              status:false,
              message:'there are some error with query'
              })
        }else{
            if(results.rowCount <= 0){
    connection.query('INSERT INTO user_record(name,email,password) values ($1,$2,$3)',[users.name,users.email,users.password], function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
}
else {
    res.json({
        status:false,
      message:"Email Already exits"
    });
}
}
    });
}
