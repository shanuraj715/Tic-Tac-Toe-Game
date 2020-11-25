let player1 = '' // player1 name
let player2 = '' // player2 name
let trun = 0; // 0 for player1 and 1 for player2

let player1_wins = 0;
let player2_wins = 0;


$(document).ready( () => {
    setPlayerName()
    
} )

setPlayerName = () => {
    $('#screen1').css('display', 'none')
    setPlayer1Name();
}

setPlayer1Name = () => {
    bootbox.prompt({
        title: "Enter first player name.", 
        centerVertical: true,
        callback: function(result){ 
            result != '' ? player1 = result : setPlayer1Name()
            if( result != '' ){
                player1 = result
                setPlayer2Name()
            }
        }
    });
}

setPlayer2Name = () => {
    bootbox.prompt({
        title: "Enter second player name.", 
        centerVertical: true,
        callback: function(result){ 
            if( result != '' ){
                player2 = result
                startGame()
            }
        }
    });
}

startGame = () => {
    $('#screen1').css('display', 'initial')
    $('.player1-name').text(player1)
    $('.player1-wins').text(player1_wins)
    $('.player2-name').text(player2)
    $('.player2-wins').text(player2_wins)
}









/* Game JS */

let player1_values = '000000000'
let player2_values = '000000000'

let winning_combinations = [ '111000000', '000111000', '000000111', '100100100', '010010010', '001001001', '100010001', '001010100']