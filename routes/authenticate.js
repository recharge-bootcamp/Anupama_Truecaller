var connection = require('./dbConnection');
var config = require('./config');
var jwt    = require('jsonwebtoken'); 
exports.authenticate=function(req, res) {
    var name = req.body.name;
    var user = {Name:req.body.name,Password:req.body.password}
    console.log(req.body);
    connection.query('SELECT Name,Password from Users WHERE Name=?',name,function(err,rows){
        if(rows.length !=0){
            if(rows[0].Password != req.body.password){
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }else{
                var tokenGot = jwt.sign(user,config.secret);
            res.json({
                success: true,
                 message: 'User Authorised',
                token: tokenGot
                });
            }
        }else{
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        })
}
