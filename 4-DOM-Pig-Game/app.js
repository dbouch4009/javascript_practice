/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameIsPlaying = true;

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
init();



//querySelector selects first element according to CSS attributes
//innerHTML will allow passing HTML as strings, instead of just parsing JS into HTML

//document.querySelector('#current-' + activePlayer).textContent = dice;


//'#' for selecting ID, '.' for selecting class. Setting to none here for initial screen


//Using querySelector to read from HTML text
//var myTemp = document.querySelector('#score-1').textContent;
//console.log(myTemp);

//Events and Event Handling
//Event Listener is a method that waits for an event to happen
//Callback function is a function passed into another function
//Anonymous function is a function that does not have a name, and cannot be reused. Can be done as a callback function

// Function for updating UI
function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        // 'Active' panel change based on active player'
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
}

//Check if player won the game
function checkForWin(){
    if(scores[activePlayer] >= 20){
        //Game winner code
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gameIsPlaying = false;
    }
}

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gameIsPlaying){    
        var dice = Math.floor(Math.random() * 6) + 1;    
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';    
        console.log('score: ' + dice);
        
        //End turn if roll was a 1
        if(dice > 1){
            roundScore = roundScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else{
            //Ternary Operator: same as a simple if-else statement. This is asking the activePlayer variable to change based on 'if' logic
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gameIsPlaying){
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];    
        checkForWin();
        nextPlayer();    
    }
});

document.querySelector('.btn-new').addEventListener('click', init);  //putting the function call operator would cause it to be called immediately

function init()
{    
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gameIsPlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

