// Javascript for tictactoe project: Page 4(Play Page)
// Class: EECS 1012, York University, Lassonde School of Engineering
var url = "http://localhost:3000/post";
var winner = "";

// Authors: Oluwafunmbi Akande, Urshita Bharal,  Gracie Zhou
//the buttons and their navigations
function back() {
    window.location.href = "page2.html";
} 
// this button goes to an identical 'how to play' page, the only difference is the back button on this one goes to the Play page 
function howtoplay() {
    window.location.href = "page3.html";
} 
// link this function below to whatever you named the exit page
function exit() {
    window.location.href = "pageExit.html";
    $.post(url+'?data='+JSON.stringify({
        "action": "exit"}), //when the exit button is pressed
        response);
}

function playAgain() {
    window.location.href = "page2.html";
    $.post(url+'?data='+JSON.stringify({
        "action": "play_again"}), //when the play again button is pressed
        response);
}



window.onload = function(){
   firstPlayerTurn();  //only call this function when window reloads before player 1 clicks anything
}

function firstPlayerTurn(){  //displays player 1's turn on the header of the game screen
    $.post(url+'?data='+JSON.stringify({
        "action": "first_players_turn"}), //requests player 1 from the server
        response);
}

//returns response from the server according to the actions
function response(data, status){
    var name = "";
    var symbol = "";
    var buttonIndex = -1;
    var response = JSON.parse(data);
    console.log(data);
    if (response['action'] == 'first_players_turn'){
        name = response['player'];
        document.getElementById("playerTurn").innerHTML = ""+name+"'s Turn";
    }
    else if (response['action'] == 'play'){
        
        buttonIndex = response['button_index'];
        symbol = response['symbol'];
        console.log("symbol "+symbol+" on the box "+ buttonIndex);
        document.getElementById("box_"+buttonIndex).innerHTML = symbol;

        winner = response['winner'];
        
        if (winner.length > 0){
            document.getElementById("winnerPlayer").innerHTML = "The winner is "+winner;
            document.getElementById("gameOver").innerHTML = "Game over";
            return;
        }
        
        name = response['next_player'];
        document.getElementById("playerTurn").innerHTML = ""+name+"'s Turn";

    }
}

//this function is called every time after a player clicks 
function play(index) {
   
    console.log("The play method is "+document.getElementById("box_"+index).innerHTML);
    var currentSymbol = document.getElementById("box_"+index).innerHTML;
    
    
    if (winner.length > 0){
        
        alert(winner+" won the game. Game is over");
        return;
    }

    if (currentSymbol.length > 0){
        alert("Please click on another box");
        return;
    }

    $.post(url+'?data='+JSON.stringify({
        "action": "play",
        "button_index": index}), 
        response);
}




