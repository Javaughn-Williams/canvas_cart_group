// Select the form and the error container
const form = document.querySelector(".sign-in-form");
let errorEl = document.querySelector("#login-error");

// Listen for form submission
form.addEventListener("submit", log_in);

function log_in(e) {
  e.preventDefault(); // Stop page reload
  clearError();

  const trn_field = document.getElementById("trn");
  const password_field = document.getElementById("password");

  let trn_input = trn_field.value.trim().replace(/\D/g, ""); // remove dashes/spaces
  const password = password_field.value;

  // Check for empty fields
  if (!trn_input || !password) {
    showError("Please enter both TRN and password.");
    return;
  }

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find matching user (normalize stored TRN by removing dashes)
  const user = users.find((u) => u.trn.replace(/\D/g, "") === trn_input);

  if (!user) {
    showError("No account found with this TRN.");
    return;
  }

  if (user.password !== password) {
    showError("Incorrect password.");
    return;
  }

  // Successful login: save current
  const safeUser = { ...user };

  localStorage.setItem("currentUser", JSON.stringify(safeUser.trn));

  // Redirect to homepage
  alert("Login successful!");
  window.location.href = "index.html";
}

// Function to show error messages
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

// Function to clear previous errors
function clearError() {
  if (errorEl) errorEl.textContent = "";
}
