function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseButton = document.querySelector(".close");

const form = document.getElementById("form");
form.addEventListener("submit", (event) => validateForm(event));

// launch modal event
modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalbg.style.display = "block";
  })
);
/* This is a JavaScript event listener. It is listening for the user to click on the close button. When
the user clicks on the close button, the modal is closed. */
modalCloseButton.addEventListener("click", () => {
  modalbg.style.display = "none";
});

const validateForm = (event) => {
  event.preventDefault();

  /**
   * récupérer tout les inputs (pas les radios ni les checkbox)
   * - firstname
   * - lastname
   * - email
   * - birthdate
   * - quantity
   * - boutons radios
   * - bouton des CGU
   */
  const firstNameInput = document.getElementById("first");
  const lastNameInput = document.getElementById("last");
  const emailInput = document.getElementById("email");
  const birthdateInput = document.getElementById("birthdate");
  const quantityInput = document.getElementById("quantity");

  const locationRadios = document.getElementsByName("location");
  const radios = Array.from(locationRadios);
  const checked = radios.filter((radio) => radio.checked === true);

  const touCheckbox = document.getElementById("checkbox1");

  /* Regex */
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  const quantityRegex = /\d+/;

  /**
   * récupérer les valeurs des champs dans un tableau d'objets "data"
   */
  const data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    birthdate: birthdateInput.value,
    quantity: quantityInput.value,
  };

  /**
   * initialiser un tableau vide d'erreurs
   */
  const errors = {};

  formData.forEach((formData) => {
    formData.setAttribute("data-error-visible", false);
    formData.setAttribute("data-error", "");
  });

  const setError = (inputElement, errorMessage) => {
    inputElement === locationRadios ? (
      inputElement[0].parentNode.setAttribute("data-error-visible", true),
      inputElement[0].parentNode.setAttribute("data-error", errorMessage)
    ) : (
      inputElement.parentNode.setAttribute("data-error-visible", true),
      inputElement.parentNode.setAttribute("data-error", errorMessage)
    )
  };

  data.firstName.length < 2 ? (setError(firstNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du nom."), errors["firstName"] = true) : null;
  data.lastName.length < 2 ? (setError(lastNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du prénom."), errors["lastName"] = true) : null;
  !data.email.match(emailRegex) ? (setError(emailInput, "Veuillez entrer une adresse email valide."), errors["email"] = true) : null;
  !data.birthdate ? (setError(birthdateInput, "Vous devez entrer votre date de naissance."), errors["birthdate"] = true) : null;
  !data.quantity.match(quantityRegex) ? (setError(quantityInput, "Veuillez entrer un nombre valide."), errors["quantity"] = true) : null;
  checked.length < 1 ? (setError(locationRadios, "Vous devez choisir une option."), errors["location"] = true) : null;
  !touCheckbox.checked ? (setError(touCheckbox, "Vous devez vérifier que vous acceptez les termes et conditions."), errors["tos"] = true) : null;
  console.log(Object.keys(errors).length)
  if (Object.keys(errors).length === 0) {
    confirmationForm();
  }
};

const confirmationForm = () => {
  console.log("test")
  const modalBody = document.querySelector('.modal-body');
  form.style.display = 'none';

  const confirmationTitle = document.createElement('h3');
  confirmationTitle.textContent = "Merci pour votre inscription";
  confirmationTitle.style.textAlign = 'center';
  confirmationTitle.style.margin = '16px 0';

  const confirmationButton = document.createElement('button');
  confirmationButton.classList.add('button');
  confirmationButton.classList.add('btn-submit');
  confirmationButton.textContent = "Fermer";
  confirmationButton.addEventListener('click', () => { form.submit() });

  modalBody.appendChild(confirmationTitle);
  modalBody.appendChild(confirmationButton);
}
