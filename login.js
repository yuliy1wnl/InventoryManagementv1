const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');

document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    input.type = input.type === 'password' ? 'text' : 'password';
  });
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Default admin login
  if (username === 'admin' && password === 'password') {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
    return;
  }

  // Check signed up users
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
  } else {
    errorMsg.textContent = 'Invalid username or password';
  }
});