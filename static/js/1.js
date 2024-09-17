// 'document' refers to the entire HTML document that is loaded in the browser.
// It provides access to the DOM (Document Object Model), which represents the structure of the web page.
document.addEventListener('DOMContentLoaded', () => {
    // 'addEventListener' is a method that attaches an event handler to the specified event ('DOMContentLoaded' here).
    // It listens for the event to occur and executes the provided callback function when the event fires.
    
    // 'DOMContentLoaded' is an event that fires when the initial HTML document has been completely loaded and parsed,
    // without waiting for stylesheets, images, and subframes to finish loading.
    // We use it to ensure that the DOM is fully loaded before trying to access elements.
    
    // '() =>' is an arrow function (introduced in ES6), which is a shorter syntax for writing functions.
    // It provides a more concise way to write anonymous functions and binds the 'this' keyword differently compared to regular functions.

    // 'const' is used to declare variables that are block-scoped, similar to 'let'.
    // The value assigned to a 'const' variable cannot be reassigned, making it a good fit for values that should not change.
    const emotionItems = document.querySelectorAll('#emotion-list li');
    // 'querySelectorAll' is a method that returns a static (not live) NodeList of all elements
    // that match the specified group of selectors ('#emotion-list li' here).
    // In this case, it's selecting all <li> elements inside the element with id 'emotion-list'.
    
    // 'forEach' is a method used to loop over each item in the NodeList ('emotionItems').
    emotionItems.forEach(item => {
        // Inside this loop, 'item' refers to each individual <li> element.

        // Here, an event listener is added to each list item.
        // This listener waits for a 'click' event and runs the provided function when the item is clicked.
        item.addEventListener('click', () => {
            // 'dataset' is an object that stores all data-* attributes of the HTML element.
            // 'item.dataset.emotion' retrieves the value of the data-emotion attribute from the clicked <li> element.
            // We are checking if the clicked item has a 'data-emotion' value of 'Other'.
            if (item.dataset.emotion === 'Other') {
                // If the emotion is 'Other', it calls the 'showOtherDialog' function, which opens a dialog for custom input.
                showOtherDialog();
            } else {
                // If any other emotion is clicked, it toggles the 'selected' class on the <li> element.
                // 'classList.toggle' is used to add the class if it doesn't exist and remove it if it does.
                // The 'selected' class is typically used to visually highlight the selected emotion.
                item.classList.toggle('selected');
            }
        });
    });
});

// Function to show the signup dialog
function showSignup() {
    // 'document.getElementById' is used to access the HTML element with the ID 'auth-section'.
    // This section contains the buttons for login and signup. We want to hide this section when showing the signup dialog.
    document.getElementById('auth-section').style.display = 'none';
    // 'style.display' controls the visibility of the element. Setting it to 'none' hides the element from view.
    
    // Access the element with the ID 'signup-dialog', which is the dialog box for user signup.
    // We want to display this dialog when the signup button is clicked.
    document.getElementById('signup-dialog').style.display = 'block';
    // Setting 'style.display' to 'block' makes the dialog box visible.
}

// Function to show the login dialog
function showLogin() {
    // Similar to 'showSignup', we first hide the 'auth-section' where login and signup buttons are located.
    document.getElementById('auth-section').style.display = 'none';
    
    // We then show the login dialog by setting its 'style.display' to 'block'.
    document.getElementById('login-dialog').style.display = 'block';
    // This makes the login dialog visible to the user.
}

// Function to hide both the signup and login dialogs, and show the authentication section
function hideDialog() {
    // Access the elements with the IDs 'signup-dialog' and 'login-dialog', which are the dialog boxes for signup and login.
    // We hide these dialogs by setting their 'style.display' properties to 'none'.
    document.getElementById('signup-dialog').style.display = 'none';
    document.getElementById('login-dialog').style.display = 'none';
    
    // After hiding the dialogs, we want to show the 'auth-section' again.
    // This section contains the buttons for 'Signup' and 'Login', and should be visible to users for further actions.
    document.getElementById('auth-section').style.display = 'block';
}

// Function to show the dialog for entering a custom emotion (Other)
function showOtherDialog() {
    // Access the element with the ID 'other-dialog', which is the dialog box for entering custom emotions.
    // We display this dialog by setting its 'style.display' property to 'block'.
    document.getElementById('other-dialog').style.display = 'block';
}

// Function to hide the custom emotion dialog
function hideOtherDialog() {
    // Access the element with the ID 'other-dialog' and hide it by setting its 'style.display' property to 'none'.
    // This will make the custom emotion dialog disappear from the view.
    document.getElementById('other-dialog').style.display = 'none';
}


// Function to add a custom emotion to the list
function addOtherEmotion() {
    // Access the input field with ID 'other-emotion' and get its current value.
    // 'trim()' is used to remove any leading or trailing whitespace from the input value.
    const otherEmotion = document.getElementById('other-emotion').value.trim();
    
    // Check if the 'otherEmotion' variable is not empty (i.e., the user has entered some text).
    // If it's empty, the function does nothing.
    if (otherEmotion) {
        // Use 'document.querySelector' to select the list item (<li>) in the #emotion-list
        // that has a 'data-emotion' attribute with the value "Other".
        const otherItem = document.querySelector('#emotion-list li[data-emotion="Other"]');
        
        // Set the text content of the selected list item to include the custom emotion.
        // '🗨️' is an emoji representing speech or thought bubbles, used here to denote the custom entry.
        otherItem.textContent = `🗨️ ${otherEmotion}`;
        
        // Update the 'data-emotion' attribute of the list item to store the custom emotion value.
        otherItem.dataset.emotion = otherEmotion;
        
        // Add the CSS class 'selected' to the list item to indicate that it has been selected.
        // This might change the item's appearance, e.g., highlighting it.
        otherItem.classList.add('selected');
        
        // Call the 'hideOtherDialog' function to hide the dialog box where the custom emotion was entered.
        hideOtherDialog();
    }
}

// Function to hide the notification dialog
function hideNotification() {
    // Access the element with ID 'notification-dialog' and hide it by setting its 'style.display' property to 'none'.
    // This will remove the notification dialog from view.
    document.getElementById('notification-dialog').style.display = 'none';
}

// Function to handle user signup
function signup() {
    // Log a message to the console indicating the signup process has started.
    console.log("Signing up...");
    
    // Retrieve the value from the input field with ID 'signup-username' and store it in the 'username' variable.
    // This represents the user's chosen username or email for signup.
    const username = document.getElementById('signup-username').value;
    
    // Retrieve the value from the input field with ID 'signup-password' and store it in the 'password' variable.
    // This represents the user's chosen password for signup.
    const password = document.getElementById('signup-password').value;

    // Use the Fetch API to send a POST request to the '/signup' endpoint.
    // This endpoint is expected to handle user registration on the server.
    fetch('/signup', {
        // Specify the HTTP method as 'POST', meaning we're sending data to the server.
        method: 'POST',
        // Set the request headers to indicate that the body of the request is in JSON format.
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the username and password into a JSON string and include it in the body of the request.
        body: JSON.stringify({ email: username, password: password })
    })
    // Handle the response from the server, which is expected to be in JSON format.
    .then(response => response.json())
    // Process the data received from the server.
    .then(data => {
        // Check if the server's response indicates a successful registration.
        if (data.message === 'User registered successfully') {
            // Display a success message to the user.
            alert('Signup successful!');
            // Call the 'hideDialog' function to close the signup dialog.
            hideDialog();
            // Call the 'showLogin' function to display the login dialog.
            showLogin();
        } else {
            // If registration was not successful, display an error message with the server's message.
            alert('Signup failed: ' + data.message);
        }
    })
    // Handle any errors that occur during the fetch operation.
    .catch(error => {
        // Log the error to the console for debugging purposes.
        console.error('Error during signup:', error);
        // Display a generic error message to the user indicating signup failure.
        alert('Signup failed. Please try again.');
    });
}

// Function to handle user login
function login() {
    // Log a message to the console indicating the login process has started.
    console.log("Logging in...");
    
    // Retrieve the value from the input field with ID 'login-username' and store it in the 'username' variable.
    // This represents the user's email or username for login.
    const username = document.getElementById('login-username').value;
    
    // Retrieve the value from the input field with ID 'login-password' and store it in the 'password' variable.
    // This represents the user's password for login.
    const password = document.getElementById('login-password').value;

    // Use the Fetch API to send a POST request to the '/login' endpoint.
    // This endpoint is expected to handle user authentication on the server.
    fetch('/login', {
        // Specify the HTTP method as 'POST', meaning we're sending data to the server for authentication.
        method: 'POST',
        // Set the request headers to indicate that the body of the request is in JSON format.
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the username and password into a JSON string and include it in the body of the request.
        body: JSON.stringify({ email: username, password: password })
    })
    // Handle the response from the server, which is expected to be in JSON format.
    .then(response => response.json())
    // Process the data received from the server.
    .then(data => {
        // Check if the server's response indicates a successful login.
        if (data.message === 'Logged in successfully') {
            // Display a success message to the user.
            alert('Login successful!');
            // Call the 'hideDialog' function to close any open dialog boxes.
            hideDialog();
            // Hide the authentication section (login/signup) from the view.
            document.getElementById('auth-section').style.display = 'none';
            // Show the polling section where users can cast their votes.
            document.getElementById('poll-section').style.display = 'block';
            // Show the statistics section where users can see voting statistics.
            document.getElementById('stats-section').style.display = 'block';
            // Call 'fetchStats' function to update the voting statistics on the page.
            fetchStats();
        } else {
            // If login was not successful, display an error message with the server's response message.
            alert('Login failed: ' + data.message);
        }
    })
    // Handle any errors that occur during the fetch operation.
    .catch(error => {
        // Log the error to the console for debugging purposes.
        console.error('Error during login:', error);
        // Display a generic error message to the user indicating login failure.
        alert('Login failed. Please try again.');
    });
}

// Function to handle the submission of votes
function submitVote() {
    // Log a message to the console indicating that the vote submission process has started.
    console.log("Submitting vote...");
    
    // Select all list items with the 'selected' class within the '#emotion-list' element.
    // This retrieves the emotions that the user has selected for voting.
    const selectedEmotions = document.querySelectorAll('#emotion-list li.selected');
    
    // Check if no emotions have been selected.
    if (selectedEmotions.length === 0) {
        // Alert the user that they need to select at least one emotion.
        alert('Please select at least one emotion.');
        // Exit the function early since no vote can be submitted without selection.
        return;
    }

    // Create an array of emotion texts by mapping over the selected emotions and retrieving the 'data-emotion' attribute.
    const emotionTexts = Array.from(selectedEmotions).map(emotion => emotion.dataset.emotion);

    // Use the Fetch API to send a POST request to the '/vote' endpoint with the selected emotions.
    fetch('/vote', {
        // Specify the HTTP method as 'POST' to indicate data submission.
        method: 'POST',
        // Set the request headers to indicate that the request body is in JSON format.
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the selected emotions into a JSON string and include it in the body of the request.
        body: JSON.stringify({ emotions: emotionTexts })
    })
    // Handle the response from the server, which is expected to be in JSON format.
    .then(response => response.json())
    // Process the data received from the server.
    .then(data => {
        // Use a timeout to delay the execution of the following code by 1 second.
        setTimeout(() => {
            // Display an alert with the server's response message.
            alert(data.message);
            // Call the 'clearSelections' function to reset the selection of emotions.
            clearSelections();
            // Call the 'fetchStats' function to update the voting statistics on the page.
            fetchStats();
            // Call the 'showNotification' function to display a notification with the updated statistics.
            showNotification(data.stats);
        }, 1000); // 1 second delay
    })
    // Handle any errors that occur during the fetch operation.
    .catch(error => {
        // Log the error to the console for debugging purposes.
        console.error('Error during vote submission:', error);
        // Display a generic error message to the user indicating that the vote submission failed.
        alert('Vote submission failed. Please try again.');
    });
}

// Function to clear the selections of emotions from the '#emotion-list' element.
function clearSelections() {
    // Select all list items with the 'selected' class within the '#emotion-list' element.
    // Remove the 'selected' class from each item to clear the selection.
    document.querySelectorAll('#emotion-list li.selected').forEach(item => {
        item.classList.remove('selected');
    });
}

// Function to fetch voting statistics from the server
function fetchStats() {
    // Use the Fetch API to send a GET request to the '/stats' endpoint.
    fetch('/stats')
    // Handle the response from the server, which is expected to be in JSON format.
    .then(response => response.json())
    // Process the data received from the server.
    .then(data => {
        // Log the fetched statistics to the console for debugging purposes.
        console.log('Fetched stats:', data);
        // Call the 'updateChart' function to update the chart with the fetched statistics.
        updateChart(data);
    })
    // Handle any errors that occur during the fetch operation.
    .catch(error => {
        // Log the error to the console for debugging purposes.
        console.error('Error fetching stats:', error);
    });
}

// Variable to hold the chart instance for updating or destroying it
let chartInstance;

// Function to update the chart with new statistics
function updateChart(stats) {
    // Get the 2D rendering context of the canvas element with ID 'emotionChart'
    const ctx = document.getElementById('emotionChart').getContext('2d');
    
    // Check if there is an existing chart instance and destroy it if present.
    if (chartInstance) {
        chartInstance.destroy();  // Destroy existing chart
    }

    // Create a new Chart instance with the 2D context and the provided statistics data.
    chartInstance = new Chart(ctx, {
        // Specify the type of chart to be 'bar'
        type: 'bar',
        // Provide the data to be displayed in the chart
        data: {
            // Set the labels of the chart based on the keys of the statistics object
            labels: Object.keys(stats),
            // Define the datasets to be included in the chart
            datasets: [{
                label: 'Number of Votes',
                // Set the data values based on the values of the statistics object
                data: Object.values(stats),
                // Generate random background colors for each bar in the chart
                backgroundColor: generateRandomColors(Object.keys(stats).length),
                // Set the border color for the bars in the chart
                borderColor: 'rgba(75, 192, 192, 1)',
                // Set the border width for the bars in the chart
                borderWidth: 1
            }]
        },
        // Configure the chart options
        options: {
            // Set up the scales for the chart
            scales: {
                // Configure the y-axis to start at zero
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to generate an array of random colors
function generateRandomColors(count) {
    // Initialize an empty array to hold the generated colors
    const colors = [];
    // Generate a random color for each required count
    for (let i = 0; i < count; i++) {
        // Create a color string in RGBA format with random values for red, green, and blue channels
        const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
        // Add the generated color to the array
        colors.push(color);
    }
    // Return the array of generated colors
    return colors;
}



// Call this function periodically or after a successful vote submission
//setInterval(updateGraph, 5000); // Update every 5 seconds

