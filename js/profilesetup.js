const nameInput = document.getElementsByTagName("input")[0];
const emailInput = document.getElementsByTagName("input")[1];

const submitbtn = document.getElementsByTagName("button")[0];
const errorContainer = document.getElementById("error-container");

const user = {};

const userData = (username, useremail) => {
  user.username = username;
  user.useremail = useremail;

  const JSON_user = JSON.stringify(user);
  localStorage.setItem("userinfo", JSON_user);

  window.location.href = "../html/product.html";
};

const showError = (message) => {
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = message;

  errorContainer.appendChild(errorMessage);

  setTimeout(() => {
    errorContainer.removeChild(errorMessage);
  }, 3000);
};

submitbtn.addEventListener("click", (e) => {
  e.preventDefault();

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const username = nameInput.value;
  const useremail = emailInput.value;
  clearErrors();

  if (username === "" || useremail === "") {
    showError("Please fill in all fields.");
  } else if (!emailPattern.test(useremail)) {
    showError("Please enter a valid email address.");
  } else {
    userData(username, useremail);
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem("userinfo")) {
    window.location.href = "../html/product.html";
  }
});

const clearErrors = () => {
  errorContainer.innerHTML = "";
};
