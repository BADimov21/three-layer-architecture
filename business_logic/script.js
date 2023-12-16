function validateLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Read the content of the text file
    fetch('../data/database.txt')
        .then(response => response.text())
        .then(data => {
            let users = data.split('\n');
            let check = false;

            // Check if the entered username and password match any line in the text file
            users.forEach(user => {
                let [storedUsername, storedPassword] = user.split(',');

                // Trim whitespaces in case there are any
                storedUsername = storedUsername.trim();
                storedPassword = storedPassword.trim();

                if (username === storedUsername && password === storedPassword) {
                    check = true;
                }
            });

            // Display a message based on the validation result
            if (check) {
                // Redirect to the dashboard upon successful login
                window.location.href = '../presentation/pages/dashboard.html';
                localStorage.setItem('username', username);
            } else {
                document.getElementById("resultMessage").innerText = "Error! Invalid username or password.";
            }
        })
        .catch(error => console.error('Error reading the file:', error));
}