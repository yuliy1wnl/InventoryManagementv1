document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();
  const msg = document.getElementById("signup-msg");

  if (username && password) {
    // Save user in localStorage
    localStorage.setItem("user", JSON.stringify({ username, password }));
    msg.style.color = "green";
    msg.textContent = "Account created successfully! Redirecting to login...";
    
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } else {
    msg.style.color = "red";
    msg.textContent = "Please fill all fields.";
  }
});
