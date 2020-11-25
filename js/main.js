let player1 = '' // player1 name
let player2 = '' // player2 name
let turn = 0 // 0 for player1 and 1 for player2

let player1_wins = 0 // total winning of player 1
let player2_wins = 0 // total winning of player 2

let player1_values = '000000000' 
let player2_values = '000000000'

let player1_int_val = 0
let player2_int_val = 0

let winning_combinations = [ '111000000', '000111000', '000000111', '100100100', '010010010', '001001001', '100010001', '001010100']
let combinations = winning_combinations.length


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
            if( result != '' && result != null ){
                player1 = result
                setPlayer2Name()
            }
            if( result == null ){
                setPlayer1Name();
            }
        }
    });
}

setPlayer2Name = () => {
    bootbox.prompt({
        title: "Enter second player name.", 
        centerVertical: true,
        callback: function(result){ 
            if( result != '' && result != null ){
                player2 = result
                startGame()
            }
            if( result == null ){
                setPlayer2Name();
            }
        }
    });
}

startGame = () => {
    updateTurnText()
    $('#screen1').css('display', 'initial')
    $('.player1-name').text(player1)
    $('.player1-wins').text(player1_wins)
    $('.player2-name').text(player2)
    $('.player2-wins').text(player2_wins)
}


$('.restart-button').click( () => {
    location.reload();
})


/* Game JS */

$('.click-btn').click(function () {
    let clicked_btn = $(this).attr('btn-id');
    if( $(this).attr('click') == undefined || $(this).attr('click') == 'true'){
        $(this).attr('click', 'false');
        if( turn === 0 ){
            $(this).children('.fas').removeClass('fas').addClass('far');
            $(this).children('.fa-stop').removeClass('fa-stop').addClass('fa-circle');
        }
        else{
            $(this).children('.fa-stop').removeClass('fa-stop').addClass('fa-times');
        }


        if( turn === 0 ){
            player1_values = stringReplacement( player1_values, clicked_btn - 1, '1');
            turn = 1;
            if( checkForWinning( player1_values ) ){
                won(1);
            }
        }
        else{
            player2_values = stringReplacement( player2_values, clicked_btn - 1, '1');
            turn = 0;
            if( checkForWinning( player2_values ) ){
                won(2);
            }
        }
        player1_int_val = parseInt(player1_values)
        player2_int_val = parseInt(player2_values)
        if( player1_int_val + player2_int_val == '111111111' ){
            tie();
        }
        updateTurnText();
    }
    
})

stringReplacement = ( string, replace_position, replace_with) => {
    return string.substring(0, replace_position) + replace_with + string.substring(replace_position + 1);
}

won = ( player_number ) => {
    if( player_number === 1 ){
        player1_wins++;
        $('.player1-wins').text(player1_wins)
        bootbox.alert({
            message: player1 + ' won',
            centerVertical: true
        })
        turn = 0;
    }
    else if( player_number === 2 ){
        player2_wins++;
        $('.player2-wins').text(player2_wins)
        bootbox.alert({
            message: player2 + ' won',
            centerVertical: true
        })
        turn = 1;
    }
    resetGame();
}

tie = () => {
    bootbox.alert({
        message: 'Match draw!',
        centerVertical: true
    })
    turn = 0;
    resetGame()
}

checkForWinning = ( player_value ) => {
    let split_values = player_value.split('')
    let counter = 0;
    for( i = 0; i<combinations; i++ ){
        let wc_split = winning_combinations[i].split('')
        for( j = 0; j < 9; j++ ){
            if( wc_split[j] == 1 && split_values[j] == 1 ){
                counter++
            }
        }
        if( counter == 3 ){
            return true;
            break;
        }
        else{
            counter = 0;
        }
    }
    if( counter != 3 ){
        return false;
    }
}

resetGame = () => {
    $('.click-btn').children('.far').removeClass('far').addClass('fas');
    $('.click-btn').children('.fa-circle').removeClass('fa-circle').addClass('fa-stop');
    $('.click-btn').children('.fa-times').removeClass('fa-times').addClass('fa-stop');
    player1_values = '000000000'
    player2_values = '000000000'
    updateTurnText();
    enableOnClick();
}

updateTurnText = ( ) => {
    if( turn === 0 ){
        $('.turn-text').text(player1 + "'s Turn")
    }
    else{
        $('.turn-text').text(player2 + "'s Turn")
    }
}

enableOnClick = () => {
    $('.click-btn').attr('click', 'true')
}