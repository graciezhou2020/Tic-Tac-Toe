var player1;
var player2;
var player;
var express = require('express'); //import library into js called express
var app = express();
var symbol = "O"; //determines the symbol each player owns
var gameBoardData = [[1,1,0], [1,2,0], [1,3,0], [2,1,0], [2,2,0], [2,3,0], [3,1,0], [3,2,0], [3,3,0]];

app.post('/post', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("New express client");
  console.log("Received: ");
  console.log(JSON.parse(req.query['data']));
  var z = JSON.parse(req.query['data']);

  if (z['action'] == 'register_player'){  //check if action is register_player
    player1 = z['player_1'];
    player2 = z['player_2'];
    player = player1;
  }
  else if (z['action'] == "first_players_turn") {
    var jsontext = JSON.stringify({
        'action': 'first_players_turn',
        'player': player,
    });
    console.log(jsontext);
    res.send(jsontext);
  }
  else if (z['action'] == "play"){
    console.log("The current player is "+player);
    var coordinate = mapIndex(z["button_index"]);
    console.log("The coordinate of the clicked box is "+coordinate);  
    
    for (var index = 0; index <= gameBoardData.length - 1; index += 1){
      if (coordinate[0] == gameBoardData[index][0] && coordinate[1] == gameBoardData[index][1]){
        if (symbol === "O"){
          gameBoardData[index][2] = 1;
        }
        else if (symbol === "X"){
          gameBoardData[index][2] = -1;
        }
        else{
          gameBoardData[index][2] = 0;
        }
      }
      console.log("The current game board data index is "+gameBoardData[index]);
      
    }
    console.log("The game board data is now "+gameBoardData);

    var winner = win();
    console.log("The winner is "+winner);

    var gameOver = isGameOver(winner);
    console.log("Is the game over? "+gameOver);
    var currentSymbol = symbol;
    changePlayer();
    var jsontext = JSON.stringify({
      /*type of action */
      'action': 'play',
      /*symbol the player owns */
      'symbol': currentSymbol,
      /*shows the next player on the screen*/
      'next_player': player,
      /*displays the winner if there is one*/
      'winner': winner,
      /*determine if game is over*/
      'game_over':gameOver,
      /*return the button index of the button that the user clicked*/
      'button_index': z['button_index']
    });
  console.log("response: "+jsontext);
  res.send(jsontext);
  
  }
  
  else if (z['action'] == "play_again"){
    player1 = "";
    player2 = "";
    player = "";
    symbol = "";
    gameBoardData = [[1,1,0], [1,2,0], [1,3,0], [2,1,0], [2,2,0], [2,3,0], [3,1,0], [3,2,0], [3,3,0]];
  }

  else if (z['action'] == "exit"){
    player1 = "";
    player2 = "";
    player = "";
    symbol = "";
    gameBoardData = [[1,1,0], [1,2,0], [1,3,0], [2,1,0], [2,2,0], [2,3,0], [3,1,0], [3,2,0], [3,3,0]];
  }

  else {
    res.send(JSON.stringify({ 'msg': 'error!!!' }));
  }
  
  }).listen(3000);
  console.log("Server is running on 3000");

function mapIndex(index){ 
  var x;
  var y;
  for (var i = 0; i <= 8; i += 1){
    if (i == index){
      var coordinate = [,];
      x = xCoordinate(i);
      coordinate[0] = x;
      y = yCoordinate(i);
      coordinate[1] = y;
      return coordinate;
    }
  }
  return [];
}

//determines the x coordinate
function xCoordinate(number){
  var x;
  if (number >=0 && number <=2){
    x = 1;
    return x;
  }
  else if (number >=3 && number <=5){
    x = 2;
    return x;
  }
  else if (number >=6 && number <=8){
    x = 3;
    return x;
  }
  else{
    return -100;
  }
}

//determines the y coordinate
function yCoordinate(number){
  var y;
  if (number == 0 || number == 3 || number == 6){
    y = 1;
    return y;
  }
  else if (number == 1 || number == 4 || number == 7){
    y = 2;
    return y;
  }
  else if (number == 2 || number == 5 || number == 8){
    y = 3;
    return y;
  }
  else{
    return -100;
  }
}

function changePlayer(){
  if (player === player1){
    symbol = "X";
    player = player2;
  }
  else{
    symbol = "O";
    player = player1;
  }
  console.log("The current symbol is now "+symbol);
  console.log("The current player is now "+player);
}

function win(){
  var winnerX = hasPlayerWonX();
  console.log("The winner x is "+winnerX);
  if (winnerX.length > 0){
    return winnerX;
  }
  var winnerY = hasPlayerWonY();
  console.log("The winner y is "+winnerY);
  if (winnerY.length > 0){
    return winnerY;
  }
  var winnerZ1 = hasPlayerWonZ1();
  console.log("The winner z1 is "+winnerZ1);
  if (winnerZ1.length > 0){
    return winnerZ1;
  }
  var winnerZ2 = hasPlayerWonZ2();
  console.log("The winner z2 is "+winnerZ2);
  if (winnerZ2.length > 0){
    return winnerZ2;
  }
  return "";
}

function hasPlayerWonX(){
    var hasWinner = false;
    for (x = 1; x <= 3; x += 1){
      console.log("The current value of x is "+x);
      var z1 = findSymbol(x, 1); 
      console.log("The value of z1 is "+z1);
      if (z1 == 0){
        continue;
      }
      hasWinner = true;
      for (y = 2; y <= 3; y += 1){
        console.log("The current value of y is "+y);
        z = findSymbol(x, y);
        console.log("The current symbol is "+z);
        if (z == 0 || z != z1){
          hasWinner = false;
          break;
        }
      
      }// y loop
      if(hasWinner){
        var winnerByZ = findWinnerNameByZ(z1);
        console.log("The winner x is "+winnerByZ);
        return winnerByZ;
      }
      
    }// x loop
   return ""; 
}

function hasPlayerWonY(){
  var hasWinner = false;
  for (y = 1; y <= 3; y += 1){
    console.log("The current value of y is "+y);
    var z1 = findSymbol(1, y); 
    console.log("The value of z1 is "+z1);
    if (z1 == 0){
      continue;
    }
    hasWinner = true;
    for (x = 2; x <= 3; x += 1){
      console.log("The current value of x is "+x);
      z = findSymbol(x, y);
      console.log("The current symbol is "+z);
      if (z == 0 || z != z1){
        hasWinner = false;
        break;
      }
    
    }// x loop
    if(hasWinner){
      var winnerByZ = findWinnerNameByZ(z1);
      console.log("The winner y is "+winnerByZ);
      return winnerByZ;
    }
    
  }// y loop
 return ""; 
}

function hasPlayerWonZ1(){
  hasWinner = true;
  var z1 = findSymbol(1,1);
  for (var i = 2; i <= 3; i += 1){
    console.log("The current value of x is "+i);
    console.log("The current value of y is "+i);
    z = findSymbol(i, i);
    if (z1 == 0 || z == 0 || z != z1){
      hasWinner = false;
      break;
    }
  }
  if (hasWinner){
    var winnerByZ = findWinnerNameByZ(z1);
    console.log("The winner z1 is "+winnerByZ);
    return winnerByZ;
  }
  return "";
}

function hasPlayerWonZ2(){
  hasWinner = true;
  var z1 = findSymbol(1,3);
  for (var i = 2; i <= 3; i += 1){
    console.log("The current value of x is "+i);
    console.log("The current value of y is "+i);
    z = findSymbol(i, 4 - i);
    if (z1 == 0 || z == 0 || z != z1){
      hasWinner = false;
      break;
    }
  }
  if (hasWinner){
    var winnerByZ = findWinnerNameByZ(z1);
    console.log("The winner z2 is "+winnerByZ);
    return winnerByZ;
  }
  return "";
}

function findWinnerNameByZ(z){
  if (z == 1){
    return player1;
  }
  else if (z == -1){
    return player2;
  }
  
  return "";
}

function findSymbol(x, y){

  for (var i = 0; i <= gameBoardData.length - 1; i += 1){
    if (x == gameBoardData[i][0] && y == gameBoardData[i][1]){
      return gameBoardData[i][2];
    }
  }
  return 0;
}

function isGameOver(winner){
  var isThereWinner = false;
  if (winner.length > 0){
    isThereWinner = true;
    return true;
  }
  else{
    for (var i = 0; i <= gameBoardData.length; i += 1){
      if (gameBoardData[i][2] == 0){
        return false;
      }
    }
    return true;
  }
}