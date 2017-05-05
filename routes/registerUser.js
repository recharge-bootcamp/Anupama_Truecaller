var connection = require('./dbConnection');

exports.registerUser=function(req, res) {
  
var data = {
        "error":0,
	    "Message":"",
        "UID":""
    };  
if (!req.body) 
	return res.sendStatus(400);
var user = req.body.user;
var uid = user.UID;
var message;
delete user.UID;
connection.query('SELECT * from Users WHERE UID=?',uid,function(err,rows){
	if(rows.length != 0){
         console.log('row present', rows[0].UID);
         res.status(200).json({"error":0,"Message":"Existing User","User":rows});
    }else{
	//user.Reg_Date = new Date();
        connection.query('INSERT INTO Users SET ?', user , function(err,rows){
            if(err) {
                try{
                throw err;
                }catch(err){
                data["error"] = 1;
                
	            data["Message"] = "User Name/Number already exists";
                console.log(err);
	            data["UID"] =req.body.UID;
                res.status(200).json(data);
                }	
            }else{
                data["error"] = 0;
	            data["Message"] = "User registered successfully";
	            data["UID"] = rows.insertId;
	            res.status(200).json(data);
            }
        })
	}
    }
    );
};