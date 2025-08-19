document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // stop form refresh

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  if (username === "admin" && password === "password") {
    // save login session (basic)
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html"; // redirect to dashboard
  } else {
    errorMsg.textContent = "Invalid username or password.";
  }
});
