document.addEventListener('DOMContentLoaded', () => {
    // Existing event listeners
    const emotionItems = document.querySelectorAll('#emotion-list li');
    emotionItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.dataset.emotion === 'Other') {
                showOtherDialog();
            } else {
                item.classList.toggle('selected');  // Toggle 'selected' class on click
            }
        });
    });
});

function showSignup() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('signup-dialog').style.display = 'block';
}

function showLogin() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('login-dialog').style.display = 'block';
}

function hideDialog() {
    document.getElementById('signup-dialog').style.display = 'none';
    document.getElementById('login-dialog').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';
}

function showOtherDialog() {
    document.getElementById('other-dialog').style.display = 'block';
}

function hideOtherDialog() {
    document.getElementById('other-dialog').style.display = 'none';
}

function addOtherEmotion() {
    const otherEmotion = document.getElementById('other-emotion').value.trim();
    if (otherEmotion) {
        const otherItem = document.querySelector('#emotion-list li[data-emotion="Other"]');
        otherItem.textContent = `🗨️ ${otherEmotion}`;
        otherItem.dataset.emotion = otherEmotion;
        otherItem.classList.add('selected');
        hideOtherDialog();
    }
}

function hideNotification() {
    document.getElementById('notification-dialog').style.display = 'none';
}

function signup() {
    console.log("Signing up...");
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User registered successfully') {
            alert('Signup successful!');
            hideDialog();
            showLogin();
        } else {
            alert('Signup failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error during signup:', error);
        alert('Signup failed. Please try again.');
    });
}

function login() {
    console.log("Logging in...");
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Logged in successfully') {
            alert('Login successful!');
            hideDialog();
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('poll-section').style.display = 'block';
            document.getElementById('stats-section').style.display = 'block';
            fetchStats();
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
    });
}

function submitVote() {
    console.log("Submitting vote...");
    const selectedEmotions = document.querySelectorAll('#emotion-list li.selected');
    if (selectedEmotions.length === 0) {
        alert('Please select at least one emotion.');
        return;
    }

    const emotionTexts = Array.from(selectedEmotions).map(emotion => emotion.dataset.emotion);

    fetch('/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emotions: emotionTexts })
    })
    .then(response => response.json())
    .then(data => {
        setTimeout(() => {
            alert(data.message);
            clearSelections();
            fetchStats();
            showNotification(data.stats);
        }, 1000); // 1 second delay
    })
    .catch(error => {
        console.error('Error during vote submission:', error);
        alert('Vote submission failed. Please try again.');
    });
}

function clearSelections() {
    document.querySelectorAll('#emotion-list li.selected').forEach(item => {
        item.classList.remove('selected');
    });
}

function fetchStats() {
    fetch('/stats')
    .then(response => response.json())
    .then(data => {
        console.log('Fetched stats:', data);  // Debug print
        updateChart(data);
    })
    .catch(error => {
        console.error('Error fetching stats:', error);
    });
}

let chartInstance;

function updateChart(stats) {
    const ctx = document.getElementById('emotionChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();  // Destroy existing chart
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(stats),
            datasets: [{
                label: 'Number of Votes',
                data: Object.values(stats),
                backgroundColor: generateRandomColors(Object.keys(stats).length),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function generateRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
        colors.push(color);
    }
    return colors;
}


// Call this function periodically or after a successful vote submission
//setInterval(updateGraph, 5000); // Update every 5 seconds

