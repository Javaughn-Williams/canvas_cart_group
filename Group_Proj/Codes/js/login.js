// Select the form and the error container
const form = document.querySelector(".sign-in-form");
let errorEl = document.querySelector("#login-error");

// Max login attempts
const MAX_ATTEMPTS = 3;

// Load attempts or default to 0
let attempts = parseInt(localStorage.getItem("loginAttempts")) || 0;

// Listen for form submission
form.addEventListener("submit", log_in);

function log_in(e) {
  e.preventDefault();
  clearError();

  // If already locked
  if (attempts >= MAX_ATTEMPTS) {
    window.location.href = "account_locked.html";
    return;
  }

  const trn_field = document.getElementById("trn");
  const password_field = document.getElementById("password");

  let trn_input = trn_field.value.trim().replace(/\D/g, "");
  const password = password_field.value;

  if (!trn_input || !password) {
    showError("Please enter both TRN and password.");
    return;
  }

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find matching user
  const user = users.find((u) => u.trn.replace(/\D/g, "") === trn_input);

  if (!user) {
    failedAttempt("No account found with this TRN.");
    return;
  }

  if (user.password !== password) {
    failedAttempt("Incorrect password.");
    return;
  }

  // SUCCESSFUL LOGIN
  localStorage.setItem("loginAttempts", "0"); // reset attempts
  localStorage.setItem("currentUser", JSON.stringify(user.trn));

  alert("Login successful!");
  window.location.href = "catalog.html"; // redirect to product catalog
}

// Handle failed attempts
function failedAttempt(message) {
  if (message == "No account found with this TRN.") {
    showError(message);
    return;
  }
  attempts++;
  localStorage.setItem("loginAttempts", attempts);

  if (attempts >= MAX_ATTEMPTS) {
    window.location.href = "account_locked.html";
    return;
  }

  const remaining = MAX_ATTEMPTS - attempts;
  showError(`${message} (${remaining} attempt(s) remaining)`);
}

// Show error messages
function showError(msg) {
  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.id = "login-error";
    errorEl.style.color = "red";
    errorEl.style.marginTop = "8px";
    form.appendChild(errorEl);
  }
  errorEl.textContent = msg;
}

// Clear previous errors
function clearError() {
  if (errorEl) errorEl.textContent = "";
}
