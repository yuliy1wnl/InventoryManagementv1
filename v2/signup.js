const form = document.getElementById('signupForm');
const passEl = document.getElementById('newPassword');
const strengthBar = document.getElementById('strengthBar').querySelector('span');
const msg = document.getElementById('signup-msg');

document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    input.type = input.type === 'password' ? 'text' : 'password';
  });
});

function passwordScore(p) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[a-z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

passEl.addEventListener('input', () => {
  const score = passwordScore(passEl.value);
  strengthBar.style.width = (score / 5) * 100 + '%';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('newUsername').value.trim();
  const password = passEl.value;
  const confirm = document.getElementById('confirmPassword').value;
  const agree = document.getElementById('agree').checked;

  if (!fullName || !email || !username || !password || !confirm) {
    msg.style.color = 'red';
    msg.textContent = 'Please fill all fields.';
    return;
  }
  if (password !== confirm) {
    msg.style.color = 'red';
    msg.textContent = 'Passwords do not match.';
    return;
  }
  if (!agree) {
    msg.style.color = 'red';
    msg.textContent = 'You must agree to continue.';
    return;
  }

  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.username === username)) {
    msg.style.color = 'red';
    msg.textContent = 'Username already taken.';
    return;
  }

  users.push({ fullName, email, username, password });
  localStorage.setItem('users', JSON.stringify(users));

  msg.style.color = 'green';
  msg.textContent = 'Account created! Redirecting...';
  setTimeout(() => window.location.href = 'login.html', 1500);
});