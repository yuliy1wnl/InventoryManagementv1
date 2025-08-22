// Profile Dropdown Toggle
document.addEventListener("DOMContentLoaded", () => {
  const profile = document.getElementById("profileDropdown");
  const menu = profile?.querySelector(".profile-menu");
  const trigger = profile?.querySelector(".profile-trigger");

  if (trigger && menu) {
    trigger.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!profile.contains(e.target)) {
        menu.classList.add("hidden");
      }
    });
  }

  // View Profile Button
  const viewProfileBtn = document.getElementById("viewProfileBtn");
  if (viewProfileBtn) {
    viewProfileBtn.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }

  // Logout Button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      alert("Logging out...");
      window.location.href = "login.html";
    });
  }
});