// Javascript for tictactoe project: Page 2(Username Page)
// Class: EECS 1012, York University, Lassonde School of Engineering
// Authors: Oluwafunmbi Akande, Urshita Bharal,  Gracie Zhou
var url = "http://localhost:3000/post";

function back() {
    window.location.href = "page1.html"
}

function response(data, status){
}

function names() {
    var outputObj = document.getElementById("output");
    var player1 = document.getElementById("player1").value;
    var player2 = document.getElementById("player2").value;

    if (player1 === "" ) {
        outputObj.innerHTML = "Player 1's name cannot be blank";
    } else if (player2 === "") {
        outputObj.innerHTML = "Player 2's name cannot be blank";
    } else if (player1.toLowerCase() === player2.toLowerCase()) {
        outputObj.innerHTML = "Player 1 and Player 2 can't have the same name";
    } else {
        $.post(url+'?data='+JSON.stringify({
            "action": "register_player",
            'player_1': player1,
            'player_2': player2}), //what's the player's symbol? an x or o
        response);

        window.location.href = "page4.html"
    }

}