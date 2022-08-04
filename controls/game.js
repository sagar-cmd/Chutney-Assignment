const { compile } = require('ejs');
const { query } = require('express');
const db = require('../config/database');
const { get } = require('../routers');


module.exports.createGame = function(req,res){
    console.log(req.body);
    const {user_id1,user_id2,user_id3} = req.body;
    if(user_id1 == user_id2){
        return res.send("Please Enter Unique User Id's");
    }
    if(user_id1 == user_id3){
        return res.send("Please Enter Unique User Id's");
    }
    if(user_id2 == user_id3){
        return res.send("Please Enter Unique User Id's");
    }
    db.query("insert into game (user_id1,user_id2,user_id3) values (?,?,?)",[user_id1,user_id2,user_id3],function(err,result){
        if(err){
            return res.send("Error in inserting into the database");
        }
        return res.send("Successfully created the game. Game Id: " + result.insertId);
    });

    
}


let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
  'Ten', 'Nine', 'Eight', 'Seven', 'Six',
  'Five', 'Four', 'Three', 'Two', 'One'
];


let gameStarted = false;
    gameOver = false,
    DealerWon = false,
    User1Won = false,
    User2Won = false,
    User3Won = false,
    dealerCards = [],

    User1Status = true,
    User2Status = true,
    User3Status = true,
    
    User1Cards = [],
    User2Cards = [],
    User3Cards = [],

    dealerScore = 0,
    User1Score = 0,
    User2Score = 0,
    User3Score = 0,
    deck = [];


function createDeck(){
    if(gameStarted == false){
        let deck = []
        for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
            for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            }
            deck.push(card);
            }
        }
        shuffleDeck(deck);
        return deck;
    }
}

function shuffleDeck(deck){
    for(let i=0; i<deck.length; i++)
    {
      let swapIdx = Math.trunc(Math.random() *deck.length);
      let tmp = deck[swapIdx];
      deck[swapIdx] = deck[i];
      deck[i] = tmp; 
    }
}


function getCardNumericValue(card){
      switch(card.value){
        case 'Ace':
          return 1;
        case 'Two':
          return 2;
        case 'Three':
          return 3;
        case 'Four':
          return 4;
        case 'Five':
          return 5;
        case 'Six':
          return 6;
        case 'Seven':
          return 7;
        case 'Eight':
          return 8;
        case 'Nine':
          return 9;
        default:
          return 10; 
    }
}





function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for(let i=0; i<cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value == 'Ace'){
      hasAce = true;
    }
    if(hasAce && score+10<=21){
      return score+10;
    }
  }
   return score; 
}


function getNextCard() {
  return deck.shift();
}








module.exports.deal = function(req,res){
  const {game_id,coins1,coins2,coins3} = req.body;

  deck = createDeck();
  gameStarted = true;

  dealerCards = [getNextCard(), getNextCard()];
  User1Cards = [getNextCard(), getNextCard()];
  User2Cards = [getNextCard(), getNextCard()];
  User3Cards = [getNextCard(), getNextCard()];

  dealerScore = getScore(dealerCards);
  User1Score = getScore(User1Cards);
  User2Score = getScore(User2Cards);
  User3Score = getScore(User3Cards);
  

  db.query("select * from game where id = ?",[game_id],function(err,result){
    if(err){
      console.log("Error in accessing the database");
      return ;
    }
    const {user_id1,user_id2,user_id3} = result[0];
    db.query("insert into hand (hand_id,hand_status,hand_score) values (?,?,?)",[user_id1,"Active",User1Score],function(err,result){
      if(err){
        console.log("Error in accessing the database");
        return ;
      }
      console.log("Inserted");
    });
    db.query("insert into hand (hand_id,hand_status,hand_score) values (?,?,?)",[user_id2,"Active",User2Score],function(err,result){
      if(err){
        console.log("Error in accessing the database");
        return ;
      }
      console.log("Inserted");
    });
    db.query("insert into hand (hand_id,hand_status,hand_score) values (?,?,?)",[user_id3,"Active",User3Score],function(err,result){
      if(err){
        console.log("Error in accessing the database");
        return ;
      }
      console.log("Inserted");
    });
  });


  res.send({
    dealerCards: [getNextCard(), getNextCard()],
    dealerScore: dealerScore,
    User1Cards: [getNextCard(), getNextCard()],
    User1Score: User1Score,
    User2Cards: [getNextCard(), getNextCard()],
    User2Score: User2Score,
    User3Cards: [getNextCard(), getNextCard()],
    User3Score: User3Score,
    hand_status: "ROUND_UNDERWAY"
  });

}











