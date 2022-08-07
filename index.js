const { urlencoded } = require('body-parser');
const express = require('express');
const database = require('./config/database');
const app = express();
const port =  8080;
const path = require('path');




app.use(express.static(path.join(__dirname, 'assests')));

app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// app.get("/", (req, res) => {
  
//     let databaseName = "chutney";
  
//     let createQuery = `CREATE DATABASE ${databaseName}`;
  
//     // use the query to create a Database.
//     database.query(createQuery, (err) => {
//         if(err) throw err;
  
//         console.log("Database Created Successfully !");
  
//         let useQuery = `USE ${databaseName}`;
//         database.query(useQuery, (error) => {
//             if(error) throw error;
  
//             console.log("Using Database");
              
//             return res.send(
// `Created and Using ${databaseName} Database`);
//         })
//     });
// });

// app.use('/home',require('./routers'));

app.listen(port,function(err,result){
    if(err){
        console.log("Error in listening to the port");
        return ;
    }
    console.log("Listening to the port");
    console.log("localhost:8080")
});



