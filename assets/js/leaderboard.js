// Function to fetch and display the scores from local storage
function showLeaderboard() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.sort((a, b) => b.score - a.score);
    const scoresList = document.getElementById('leaderboard');

    scores.forEach(score => {
        const scoreListItem = document.createElement('li');
        scoreListItem.classList.add('list-item', 'has-background-light', 'mb-2', 'p-2');
        scoreListItem.textContent = `${score.initials} - ${score.score}`;
        scoresList.appendChild(scoreListItem);
    });
}

// Function to clear all saved scores from local storage
function clearLeaderboard() {
    localStorage.removeItem('scores');
    window.location.reload();
}

// Attach event listeners and invoke initial functions
document.getElementById('erase').onclick = clearLeaderboard;
showLeaderboard();