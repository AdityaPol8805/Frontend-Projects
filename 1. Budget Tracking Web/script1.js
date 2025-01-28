const authForm = document.getElementById('authForm');
const errorMessage = document.getElementById('errorMessage');
const toggleFormLink = document.getElementById('toggleForm');
const formTitle = document.getElementById('formTitle');
const submitButton = document.getElementById('submitButton');
const toggleText = document.getElementById('toggleText');

let isRegisterMode = false; // By default, it is in login mode.

// Toggle between Register and Login modes
toggleFormLink.addEventListener('click', function (e) {
  e.preventDefault();
  isRegisterMode = !isRegisterMode;
  if (isRegisterMode) {
    formTitle.innerText = 'Register';
    submitButton.innerText = 'Register';
    toggleText.innerHTML = 'Already have an account? <a href="#" id="toggleForm">Login here</a>';
  } else {
    formTitle.innerText = 'Login';
    submitButton.innerText = 'Login';
    toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggleForm">Register here</a>';
  }
});

authForm.addEventListener('submit', function (e) {
e.preventDefault();

const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

if (isRegisterMode) {
// Registration logic
if (username.trim() === '' || password.trim() === '') {
  errorMessage.innerText = 'Username and password are required!';
  errorMessage.style.display = 'block';
  return;
}

// Save the user credentials in localStorage
localStorage.setItem('username_' + username, username);
localStorage.setItem('password_' + username, password);

// Switch to login mode after registration
alert('Registration successful! You can now log in.');
isRegisterMode = false;
formTitle.innerText = 'Login';
submitButton.innerText = 'Login';
toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggleForm">Register here</a>';
} else {
// Login logic
const storedUsername = localStorage.getItem('username_' + username);
const storedPassword = localStorage.getItem('password_' + username);

if (username === storedUsername && password === storedPassword) {
  // Store the logged-in username in localStorage
  localStorage.setItem('loggedInUser', username);
  // Redirect to budget tracker
  window.location.href = 'index.html';
} else {
  errorMessage.innerText = 'Incorrect username or password!';
  errorMessage.style.display = 'block';
}
}
});