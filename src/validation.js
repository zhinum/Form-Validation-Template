export class Validation {
  constructor(formElement) {
    this.form = formElement;

    this.formOverlay = document.querySelector("#form-overlay");
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.formOverlay.classList.add("hidden");
      this.showSuccess();
    });
    this.inputs = document.querySelectorAll("input");
    this.setUpListeners();
    this.formControl();
  }
  formControl() {
    const openButton = document.querySelector(".open");
    openButton.addEventListener("click", () => {
      this.formOverlay.classList.toggle("hidden");
    });
  }

  setUpListeners() {
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.checkInputValidity(input);
        this.updateUI(input);
      });
    });
  }

  checkInputValidity(input) {
    input.setCustomValidity("");

    if (input.id === "title" && input.validity.valueMissing) {
      input.setCustomValidity("A title is required");
    }
    const password = document.querySelector("#password");
    const confirm = document.querySelector("#confirm-password");
    if (input.id === "password" || input.id === "confirm-password") {
      if (password.value !== confirm.value) {
        confirm.setCustomValidity("password does not match");
      } else {
        confirm.setCustomValidity("");
      }
      this.updateUI(confirm);
    }
  }
  updateUI(input) {
    const errorMsg = input.nextElementSibling;
    if (!input.validity.valid) {
      errorMsg.textContent = input.validationMessage;
    } else {
      errorMsg.textContent = "";
    }
  }

  showSuccess() {
    const body = document.querySelector("body");
    const highFive = document.createElement("div");
    highFive.textContent = "success✋";
    highFive.classList.add("high-five");
    body.append(highFive);
  }
}
