#!/usr/bin/env node
var connection = require('./dbConnection');
(function(){
    var sync = {};
    exports.dbSync = sync.dbSync = function(){
        var LineByLineReader = require('line-by-line');
        var lr = new LineByLineReader('./routes/contacts.txt');
        lr.on('error', function (err) {
        console.log(err);
	// 'err' contains error object
        });
         lr.on('line', function (line) {
            var sub = new Array();
            sub = line.split(" ");
            var mdn =sub[0] ;
            var name = sub[1];
            connection.query('SELECT Name from Contacts WHERE MDN=?',mdn,function(err,rows){
            if(rows.length != 0){
                connection.query('SELECT Name,CreationDate from AllContacts WHERE MDN=?',mdn,function(err,rows){
                console.log(rows);
                if(rows.length !=0){
                name= rows[0].Name;
		        var d1= rows[0].CreationDate;
                for(i=1;i<rows.length;i++){
                    if(d1 < rows[i].CreationDate) {
                        name = rows[i].Name;
                    }
                }
                connection.query('UPDATE Contacts SET Name=? WHERE MDN=?',[name,mdn],function(err,rows){
                    if(!err){
                        console.log("Contact table updated");
                    }
                })
                }else{
                    console.log("Contact not present in AllContacts table:"+mdn)
                }
                });
        }else{
            connection.query('INSERT INTO Contacts (Name,MDN) VALUES (?,?)',[name,mdn],function(err,rows){
                    if(!err){
                        console.log("Contact created");
                    }
            });
           
        }});
        //console.log("hi");
    });
    lr.on('end', function () {
            console.log("Completed all contacts")
    });
    };

    if (!module.parent) {
        sync.dbSync();
    }
})();