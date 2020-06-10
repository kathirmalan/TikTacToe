
const player1 = 'X'
const player2 = 'O'
var player1_score = 0, player2_score = 0;
var currentPlayer = player1; 
var gameStarted = false;
var roll = 1;

var matrix_map = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

function startGame(){
    
    gameStarted = true;
    let timer = 60 * 3,
    display = document.querySelector('.timer');
    let timerFunction = startTimer(timer, display);
    document.getElementById('end').value = timerFunction;
    setTimeout(function(){ 
        clearInterval(timerFunction); 
        let msg;
        if(player1_score == player2_score){
            msg = "MATCH DRAW !!";
        }else if(player1_score > player2_score){
            msg = "Congratulations! Player 1 have won by "+ player1_score +" Points !!";
        }else{
            msg = "Congratulations! Player 2 have won by "+ player2_score +" Points !!";
        }
        document.getElementById("stannoucementart").innerHTML = msg;
        document.getElementById("annoucement").style.display = block;
        console.log('The game has been stopped');
        cleanBoard();
    }, 180000);
    document.querySelectorAll('.box').forEach(item => {
        item.style.pointerEvents = "auto";
    });
    document.getElementById("start").disabled = true;
    document.getElementById("end").disabled = false;
}

function startTimer(duration, display) {
    let timer = parseInt(duration - 1);
    let min, sec;
    return setInterval(function () {
        min = parseInt(timer / 60, 10);
        sec = parseInt(timer % 60, 10);

        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        display.textContent = min + ":" + sec;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function triggerPlay(obj, i, j){
    if(gameStarted == true){
        if(roll <= 9){
            var boxId = obj.children[0].id;
            matrix_map[i][j] = currentPlayer;
            play(boxId, currentPlayer);
            let gameStatus;
            if(roll > 4){
                gameStatus = checkGameStaus();
            }else{
                gameStatus = false;
            }
            console.log(gameStatus);
            switch(gameStatus){
                case 'X': 
                    player1_score++;
                    document.getElementById('p1_score').innerHTML = player1_score;
                    cleanBoard();
                    break;
                case 'O':
                    player2_score++;
                    document.getElementById('p2_score').innerHTML = player2_score;
                    cleanBoard();
                    break;
                case 'draw':
                    cleanBoard();
                    break;
                case false:
                    break;
            }
        }else{
            alert("Game Over");
        }
    }else{
        alert("Start the game");
    }
}

function play(boxId, player){
    console.log(roll);
    document.getElementById(boxId).style.pointerEvents = "none";
    // console.log(document.getElementById(boxId));
    // console.log('Before play '+player);
    if(player == player1){
        document.getElementById(boxId).innerHTML = player1;
        document.getElementById('p2_pointer').innerHTML = '>>>>';
        document.getElementById('p1_pointer').innerHTML = '';
        currentPlayer = player2;
    }else{
        document.getElementById(boxId).innerHTML = player2;
        document.getElementById('p1_pointer').innerHTML = '>>>>';
        document.getElementById('p2_pointer').innerHTML = '';
        currentPlayer = player1;
    }
    roll++;
    console.log(matrix_map);
    // console.log('After play ',currentPlayer);
}

function stopTimer(timer){
    clearInterval(timer); 
}

function resetGame(obj){
    clearInterval(obj.value); 
    display = document.querySelector('.timer');
    display.textContent = "00:00"
    document.getElementById('p1_pointer').innerHTML = '>>>>';
    document.getElementById('p2_pointer').innerHTML = '';
    document.querySelectorAll('.box').forEach(item => {
        item.style.pointerEvents = "none";
        let boxId = item.children[0].id;
        document.getElementById(boxId).innerHTML = '';
    });
    document.getElementById("start").disabled = false;
    document.getElementById("end").disabled = true;
    console.log("The Game has been stopped");
    currentPlayer = player1;
    console.log(currentPlayer);
    gameStarted = false;
    roll = 1;
    matrix_map = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
    player1_score = 0, player2_score = 0;
    document.getElementById('p1_score').innerHTML = '0';
    document.getElementById('p2_score').innerHTML = '0';
}

function cleanBoard(){
    document.getElementById('p1_pointer').innerHTML = '>>>>';
    document.getElementById('p2_pointer').innerHTML = '';
    document.querySelectorAll('.box').forEach(item => {
        let boxId = item.children[0].id;
        document.getElementById(boxId).innerHTML = '';
    });
    console.log("Next Game Started");
    currentPlayer = player1;
    console.log(currentPlayer);
    roll = 1;
    matrix_map = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
    // player1_score = 0, player2_score = 0;
    // document.getElementsByClassName('score').innerHTML = '';
}

function checkGameStaus(){
    //check rows
    for(let i = 0; i < 3; i ++){
        if(matrix_map[i][0] != '' && matrix_map[i][0] == matrix_map[i][1] &&  matrix_map[i][0] == matrix_map[i][2]){
            return matrix_map[i][0];
        }
    }
    //check columns
    for(let j = 0; j < 3; j++){
        if(matrix_map[0][j] != '' && matrix_map[0][j] == matrix_map[1][j] &&  matrix_map[0][j] == matrix_map[2][j]){
            return matrix_map[0][j];
        }
    }
    //check diagonoly
    if(matrix_map[0][0] != '' && matrix_map[0][0] == matrix_map[1][1] &&  matrix_map[0][0] == matrix_map[2][2]){
        return matrix_map[0][0];
    }
    if(matrix_map[2][0] != ' ' && matrix_map[2][0] == matrix_map[1][1] &&  matrix_map[2][0] == matrix_map[2][0]){
        return matrix_map[2][0];
    }
    // console.log(matrix_map);
    if(roll == 9){
        return 'draw';
    }else{
        return false;
    }
    
}