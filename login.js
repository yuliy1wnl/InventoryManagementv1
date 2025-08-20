document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  // default account
  if (username === "admin" && password === "password") {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
    return;
  }

  // check localStorage for registered user
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (username === user.username && password === user.password) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
      return;
    }
  }

  errorMsg.textContent = "Invalid username or password.";
});
