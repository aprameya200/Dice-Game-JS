'use strict';

let winner = 0;

// selecting all the scores elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');


// selecting current score element
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

// dice selecting
const diceEl = document.querySelector('.dice');

//adding the hidden class to the dice elements
diceEl.classList.add('hidden');

// selecting button elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// change active player position
const player = document.querySelector('.player');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentScore;

// current player
let activePlayer;

// scores array
let scores;

// playing or not
let playing;

// variables are declared outside the init function and values are set 
// from inside it by using scoping

function init() {
    score0El.textContent = 0;
    score1El.textContent = 0;

    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    currentScore = 0;

    // current player
    activePlayer = 0;

    // scores array
    scores = [0, 0];

    // playing or not
    playing = true;

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    player0.classList.remove('player--active');
    player1.classList.remove('player--active');

    player0.classList.add('player--active');


    diceEl.classList.add('hidden');

    // playing or not
    playing = true;


    document.getElementById(`name--0`).textContent = 'PLAYER 1';
    document.getElementById(`name--1`).textContent = 'PLAYER 2';
}

// initialization function
init();

// Rolling dice funstionality class
btnRoll.addEventListener('click', function () {

    if (playing) {
        // 1.Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;



        // 2.Dice roll and displaying
        diceEl.classList.remove('hidden');
        //loads the image for the dice according to its number
        diceEl.src = `dice-${dice}.png`;


        // 3. Check if 1 then send to next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // switch next player
            SwitchPlayer();
        }
    }

});


btnHold.addEventListener('click', function () {


    if (playing) {
        // 1. Add Current score to the score of the active player

        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check Score is atleast 100
        if (scores[activePlayer] >= 20) {
            // finish the game.player--winner
            declareWinner();

        } else {
            SwitchPlayer();
        }
    }



});

// calls init function when button is clicked
btnNew.addEventListener('click', init);


function SwitchPlayer() {
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
}

function declareWinner() {
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

    document.getElementById(`name--${activePlayer}`).textContent = '🎉WINNER🎉';
    diceEl.classList.add('hidden');
    winner = activePlayer;
    playing = false;

}

