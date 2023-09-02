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

function clearLeaderboard() {
    localStorage.removeItem('scores');
    window.location.reload();
}

document.getElementById('erase').onclick = clearLeaderboard;
showLeaderboard();