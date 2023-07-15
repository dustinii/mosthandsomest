function showLeaderboard() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.sort((a, b) => b.score - a.score);
    const scoresList = document.getElementById('leaderboard');

    scores.forEach(score => {
        const scoreLi = document.createElement('li');
        scoreLi.classlist.add('list-item', 'has-background-light');
        scoreLi.textContent = `${scores.initials} - ${scores.score}`;
        scoreLi.appendChild(scoreLi);
    });
}

function clearLeaderboard() {
    localStorage.removeItem('scores');
    window.location.reload();
}

document.getElementById('erase').onclick = clearLeaderboard;
displayHighScores();