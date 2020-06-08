
function startGame(){
    let timer = 60 * 3,
    display = document.querySelector('.timer');
    let timerFunction = startTimer(timer, display);
    document.getElementById('end').value = timerFunction;
    setTimeout(function(){ 
        clearInterval(timerFunction); 
        console.log('The game has been stopped');
    }, 180000);
    document.querySelectorAll('.box').forEach(item => {
        item.addEventListener('click', event => {
          console.log(item.childNodes[0].id)
          let boxId = item.childNodes[0].id
          play(boxId, currentPlayer)
        })
    })
}


function startTimer(duration, display) {
    let timer = duration;
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

function stopTimer(timer){
    clearInterval(timer); 
}

function resetGame(obj){
    clearInterval(obj.value); 
    display = document.querySelector('.timer');
    display.textContent = "00:00"
    document.getElementById('p1_pointer').innerHTML = '-->';
    document.getElementById('p2_pointer').innerHTML = '';
    document.querySelectorAll('.box').forEach(item => {
        item.addEventListener('click', event => {
          let boxId = item.childNodes[0].id
          document.getElementById(boxId).innerHTML = '';
        })
    })
    
}


const player1 = 'X'
const player2 = 'O'
var currentPlayer = player1;
const win_prb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


function play(boxId, player){
    if(player == player1){
        document.getElementById(boxId).innerHTML = player1;
        document.getElementById('p2_pointer').innerHTML = '-->';
        document.getElementById('p1_pointer').innerHTML = '';
        document.getElementById(boxId).setAttribute("editable", true);
        currentPlayer = player2;
    }else{
        document.getElementById(boxId).innerHTML = player2;
        document.getElementById('p1_pointer').innerHTML = '-->';
        document.getElementById('p2_pointer').innerHTML = '';
        document.getElementById(boxId).setAttribute("editable", true);
        currentPlayer = player1;
    }
}