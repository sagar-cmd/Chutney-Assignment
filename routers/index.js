const express = require('express');
const router = express.Router();

const user_controller = require('../controls/user');
const game_controller = require('../controls/game');
const home_controller = require('../controls/home');


router.get('/',home_controller.home);

// app.get("/createDatabase", (req, res) => {
  
//     let databaseName = "gfg_db";
  
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


//user control
router.post('/api/v1/create_user',user.create);
router.get('/api/v1/hit:hand_id',user.hit);
router.get('/api/v1/stand:had_id',user.stand);
router.get('/api/v1/double_down/:hand_id');
router.get('/api/v1/split/:hand_id');
 

router.post('/api/v1/deal',game.deal);
router.post('/api/v1/insurance');


//game control
router.post('/api/v1/create_game',game.createGame);
router.get('/api/v1/status/:game_id');
router.get('/api/v1/winner/:game_id');
router.get('/api/v1/finish_game/:game_id');

module.exports = router;