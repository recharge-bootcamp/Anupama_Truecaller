var connection = require('./dbConnection');
var validToken = require('./validate');
exports.getuser=function(req, res) {
    validToken.validate(req,res);
    var data = {
        "error":0,
	    "Message":"",
        "MDN":"",
        "Name":""
    };  
    var mdn= req.query.mdn;
    console.log(mdn);
	connection.query('SELECT Name from Contacts WHERE MDN=?',mdn,function(err,rows){
        console.log(rows);
        if(err){
             try{
                throw err;
            }catch(err){
                console.log(err);
                data["error"]=1;
                data["Message"] = "SQL errror while getting contact";
                res.status(200).json(data);
            }
        }
	if(rows.length != 0){
        //console.log(rows);
        data["Message"] = "Contact Present";
        data["Name"] = rows[0].Name;
        data["MDN"]= mdn;
        res.status(200).json(data);

    }else{
       // console.log("No Contacts");
        data["Message"] = "Contact Not Present";
        data["MDN"]= mdn;
        res.status(200).json(data);
    }   
    })
};