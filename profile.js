document.addEventListener("DOMContentLoaded", () => {
  // Fetch user data from localStorage (from signup/login)
  const fullName = localStorage.getItem("fullName") || "John Doe";
  const email = localStorage.getItem("email") || "john@example.com";
  const username = localStorage.getItem("username") || "johndoe";

  // Update profile fields
  document.getElementById("profileName").textContent = fullName;
  document.getElementById("fullName").textContent = fullName;
  document.getElementById("email").textContent = email;
  document.getElementById("username").textContent = username;

  // Back to dashboard
  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "login.html";
    }
  });
});