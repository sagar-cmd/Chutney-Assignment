const db = require('../config/database');

module.exports.home = function(req,res){
    db.query("select * from user",function(err,result){
        if(err){
            console.log("Error in connecting to database");
            return ;
        }
        return res.render('home',{
            userCount: result.length
        });
    });
}