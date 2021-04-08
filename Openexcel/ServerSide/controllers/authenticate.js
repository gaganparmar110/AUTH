var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./../db');
module.exports.authenticate=function(req,res){
    var email=req.body.data.email;
    var password=req.body.data.password;

    connection.query('SELECT * FROM user_record WHERE email = $1',[email], function (error, results, fields) {
        console.log("error1",error);
        console.log("error2",results.rowCount);
        console.log("error3",fields);
        if (error) {
          console.log("error2",error);
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.rowCount > 0){
  decryptedString = cryptr.decrypt(results.rows[0].password);
            if(password==decryptedString){
                res.json({
                    status:true,
                    message:'successfully authenticated',
                    data: results,
                })
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
        }
        else{
            console.log("else",error)
          res.json({
              status:false,
            message:"Email does not exits"
          });
        }
      }
    });
}