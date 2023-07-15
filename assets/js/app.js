// DOM elements
const startButton = document.getElementById('start');
const timeDisplay = document.getElementById('time');
const submitButton = document.getElementById('submit');
const questionContainer = document.getElementById('questions');
const choiceContainer = document.getElementById('choices');
const feedbackDisplay = document.getElementById('feedback');
const initialsInput = document.getElementById('initials');

// holds the remaining time interval
let timerTracker;

// keep track of shuffled questions index
let questionIndex = 0;

// keep track of time
let remainingTime = 105;

function shuffleQuestions(){
    return questionArray
}

function startQuiz(){
    displayQuestion();
}

function displayQuestion(){}

function answerSelected(){}

function endQuiz(){}

function updateTime(){}

function updateTimerColor(){}

function saveScore(){}

// End of App messes up without this function
function handleEnterKey(event){}

submitButton.onclick = saveScore;
startButton.onclick = startQuiz;
choiceContainer.onclick = answerSelected;
initialsInput.onkeyup = handleEnterKey;