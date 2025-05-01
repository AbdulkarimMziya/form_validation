const form = document.querySelector("#registrationForm");
const first_name = document.querySelector("#first_name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

const firstNameError = first_name.nextElementSibling;
const emailError = email.nextElementSibling;
const passwordError = password.nextElementSibling;
const confirmPasswordError = confirmPassword.nextElementSibling;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Clear previous errors
  [firstNameError, emailError, passwordError, confirmPasswordError].forEach(span => {
    span.textContent = "";
    span.classList.remove("active");
  });

  if (
    isFirstNameValid() &
    isEmailValid() &
    isPasswordValid() &
    isPasswordConfirmed()
  ) {
    console.log("Form is valid and ready to be submitted!");
   
  }
});

// Input event for email
email.addEventListener("input", () => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.classList.remove("active");
  } else {
    showEmailError();
  }
});

// Input event for confirmPassword
confirmPassword.addEventListener("input", () => {
  if (confirmPassword.value === password.value) {
    confirmPasswordError.textContent = "";
    confirmPasswordError.classList.remove("active");
  }
});

function isFirstNameValid() {
  if (first_name.value.trim() === "") {
    firstNameError.textContent = "First name is required.";
    firstNameError.classList.add("active");
    return false;
  }
  return true;
}

function isEmailValid() {
  if (!email.validity.valid) {
    showEmailError();
    return false;
  }
  return true;
}

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Email is required.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Enter a valid email address.";
  }
  emailError.classList.add("active");
}

function isPasswordValid() {
    const pwd = password.value;
    const errors = [];
  
    if (pwd.length < 8) {
      errors.push("at least 8 characters");
    }
    if (!/[A-Z]/.test(pwd)) {
      errors.push("an uppercase letter");
    }
    if (!/[a-z]/.test(pwd)) {
      errors.push("a lowercase letter");
    }
    if (!/[0-9]/.test(pwd)) {
      errors.push("a digit");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      errors.push("a special character");
    }
  
    if (errors.length > 0) {
      passwordError.textContent = `Password must include ${errors.join(", ")}.`;
      passwordError.classList.add("active");
      return false;
    }
  
    return true;
  }

function isPasswordConfirmed() {
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
    confirmPasswordError.classList.add("active");
    return false;
  }
  return true;
}
