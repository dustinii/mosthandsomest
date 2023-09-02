// DOM elements for quiz interface
const startButton = document.getElementById('start');
const timeDisplay = document.getElementById('time');
const submitButton = document.getElementById('submit');
const questionContainer = document.getElementById('questions');
const choiceContainer = document.getElementById('choices');
const feedbackDisplay = document.getElementById('feedback');
const initialsInput = document.getElementById('initials');

// Quiz state variables
let timerID;
let questionIndex = 0;
let remainingTime = 105;

// Function to shuffle question order (Fisher-Yates algorithm)
function shuffleQuestions(questionArray) {
    for (let i = questionArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionArray[i], questionArray[j]] = [questionArray[j], questionArray[i]];
    }
    return questionArray;
}

// Function to initialize quiz
function startQuiz() {
    document.getElementById('startScreen').setAttribute('class', 'is-hidden');
    startButton.classList.add('is-hidden');
    questions = shuffleQuestions(questions);
    questions = questions.slice(0, 7);
    remainingTime = questions.length * 15;
    questionContainer.classList.remove('is-hidden');
    submitButton.classList.add('is-hidden');
    timerId = setInterval(updateTimer, 1000);
    timeDisplay.textContent = remainingTime;
    displayQuestion();
}

// Function to populate question and choices to the UI
function displayQuestion() {
    const currentQuestion = questions[questionIndex];
    document.getElementById('questionText').textContent = currentQuestion.title;
    choiceContainer.innerHTML = '';
    currentQuestion.choices.forEach((choice, i) => {
        const choiceButton = document.createElement('button');
        choiceButton.classList.add('button', 'is-primary', 'is-fullwidth', 'my-1');
        choiceButton.setAttribute('value', choice);
        choiceButton.textContent = `${i + 1}. ${choice}`;
        choiceContainer.appendChild(choiceButton);
    });
}

// Event handler to check if user's answer is correct or not
function processChoice(event) {
    if (!event.target.matches('.button')) return;
    feedbackDisplay.classList.remove('is-danger', 'is-success');

    if (event.target.value !== questions[questionIndex].answer) {
        feedbackDisplay.classList.add('is-danger');
        feedbackDisplay.textContent = 'Wrong!';
        remainingTime -= 15;

        if (remainingTime < 0) remainingTime = 0;
        timeDisplay.textContent = remainingTime;
    } else {
        feedbackDisplay.classList.add('is-success');
        feedbackDisplay.textContent = 'Correct!';
    }
    feedbackDisplay.classList.remove('is-hidden');
    setTimeout(() => feedbackDisplay.classList.add('is-hidden'), 1000);
    questionIndex++;
    if (remainingTime <= 0 || questionIndex === questions.length) endQuiz();
    else displayQuestion();
}

// Function to handle actions when the quiz is over
function endQuiz() {
    clearInterval(timerId);
    document.getElementById('scoreScreen').classList.remove('is-hidden');
    document.getElementById('finalScore').textContent = remainingTime;
    questionContainer.classList.add('is-hidden');
    submitButton.classList.remove('is-hidden');
}

// Updates the timer and checks if time is up
function updateTimer() {
    remainingTime--;
    timeDisplay.textContent = remainingTime;
    updateTimerColor();
    if (remainingTime <= 0) endQuiz();
}

// Changes the color of timer based on remaining time
function updateTimerColor() {
    const parentElement = timeDisplay.parentElement;
    parentElement.classList.remove('is-primary', 'is-warning', 'is-danger');
    if (remainingTime >= 60) parentElement.classList.add('is-primary');
    else if (remainingTime >= 20) parentElement.classList.add('is-warning');
    else parentElement.classList.add('is-danger');
}

// Stores user's score with initials in local storage
function saveScore() {
    const userInitials = initialsInput.value.trim();
    if (userInitials !== '') {
        const scores = JSON.parse(window.localStorage.getItem('scores')) || [];
        const newScore = { score: remainingTime, initials: userInitials };
        scores.push(newScore);
        window.localStorage.setItem('scores', JSON.stringify(scores));
        window.location.href = 'leaderboard.html';
    }
}

// Helper function to handle 'Enter' key press for score submission
function handleEnterKey(event) {
    if (event.key === 'Enter') saveScore();
}

// Event listeners for buttons and UI actions
submitButton.onclick = saveScore;
startButton.onclick = startQuiz;
choiceContainer.onclick = processChoice;
initialsInput.onkeyup = handleEnterKey;