const form = document.querySelector(".sign-in-form");
let errorEl = document.querySelector("#login-error");

const signup_button = document.getElementById("sign-up-button");
signup_button.addEventListener("click", signup);

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function signup(e) {
  e.preventDefault();

  // Load existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  // Collect form values
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const phone = document.getElementById("phone").value.replace(/\D/g, "");
  const trn = document.getElementById("trn").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  clearError();

  // -----------------------Validation-------------------------
  if (!firstName) return showError("First name is required.");
  if (!lastName) return showError("Last name is required.");
  if (!dob) return showError("Date of birth is required.");
  if (!gender) return showError("Gender is required.");
  if (!phone) return showError("Phone number is required.");
  if (!trn) return showError("TRN is required.");

  // Validate phone number (10 digits)
  if (!/^\d{10}$/.test(phone))
    return showError("Phone number must be 10 digits.");

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return showError("Please enter a valid email address.");

  // Validate password
  if (!password) return showError("Password is required.");
  if (password.length < 8)
    return showError("Password must be at least 8 characters long.");
  if (password !== confirmPassword) return showError("Passwords do not match.");

  // Validate TRN format (000-000-000)
  const trnRegex = /^\d{3}-\d{3}-\d{3}$/;
  if (!trnRegex.test(trn)) {
    return showError("TRN must be in the format 000-000-000.");
  }

  // Age Verification
  const age = calculateAge(dob);
  if (age < 18) {
    return showError("You must be 18 years or older to register.");
  }

  // Check for duplicate email
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    return showError("An account with this email already exists.");
  }

  // Check for duplicate TRN
  if (users.some((user) => user.trn === trn)) {
    return showError("An account with this TRN already exists.");
  }

  // Create new user
  const newUser = {
    firstName,
    lastName,
    dob,
    gender,
    phone,
    trn,
    email,
    password,
    date_created: new Date().toISOString(),
    cart: [],
    invoices: [],
  };

  // Save user
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign up successful! You can now log in.");
  window.location.href = "index.html";
}

// Show error message
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

function clearError() {
  if (errorEl) {
    errorEl.textContent = "";
  }
}
