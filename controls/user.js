const db = require('../config/database');

module.exports.create = function(req,res){
    console.log(req.body);
    const {username,coins} = req.body;
    db.query("select * from user where username = ?",[username],function(err,result){
        if(err){
            return res.send('Error in connecting to the database');
        }
        if(result.length > 0){
            return res.send('User is already created');
        }
        db.query("insert into user (username,coins) values (?,?)",[username,coins],function(err,result){
            if(err){
                return res.send('Error in connecting to the database');
            }
            return res.send('Succussfully inserted into database');
        });
    });
}


module.exports.hit = function(req,res){
    const user_id = req.body.hand_id;
    db.query("select * from hand where id = ?",[user_id],function(err,result){
        if(err){
            return res.send('Error in connecting to the database');
        }
        const {hand_id,hand_status,hand_score} = result[0];
        if(hand_status == "Active"){
            
        }
    });
}


module.exports.stand = function(req,res){

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

function getNextCard() {
  return deck.shift();
}
