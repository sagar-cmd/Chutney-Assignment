// const mysql = require('mysql');

// var db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'chutney'
//   });


//   db.connect(function(err){
//       if(err){
//           console.log("Error in connecting");
//           return ;
//       }
//       console.log("MySql Connected Successfully");
//   });
  

//   module.exports = db;
const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "postgres"
})

client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

//   module.exports = client;