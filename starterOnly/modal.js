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

// On créer la variable , en vérifiant son contenu
const modalCloseButton = document.querySelector(".close");

const form = document.getElementById("form");
/* Ecoute l'evenement (submit: envoi du fomulaire (quand le bouton est pressé)) 
et lance la fonction validateForm(). */
form.addEventListener("submit", (event) => validateForm(event));

// Une fonction d'ouverture du modal
modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalbg.style.display = "block";
  })
);

/* Il s'agit d'un écouteur d'événements JavaScript. 
Il écoute que l'utilisateur clique sur le bouton de fermeture. Lorsque
l'utilisateur clique sur le bouton de fermeture, la modale est fermée.
 */
modalCloseButton.addEventListener("click", () => {
  modalbg.style.display = "none";
});

/* L'action par défaut du formulaire ne soit pas pris en compte par le navigateur 
en utilisant la méthode preventDefault */
// Une fonction qui permet d'envoyer le formulaire
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
   * Ici on va récupérer des éléments du HTML de formulaire
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

  /* Regex ou expression régulière. Cela permet, entre autre, de vérifier le contenu d'une chaîne de caractères.*/
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  const quantityRegex = /\d+/; // Nombre uniquement

  /*
  récupérer les valeurs des champs dans un tableau d'objets "data"
   */
  const data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    birthdate: birthdateInput.value,
    quantity: quantityInput.value,
  };

  // initialiser un tableau vide d'erreurs
  const errors = {};

  formData.forEach((formData) => {
    formData.setAttribute("data-error-visible", false);
    formData.setAttribute("data-error", "");
  });

  // Affiche les messages d'erreurs si condition pas respecté
  const setError = (inputElement, errorMessage) => {
    inputElement === locationRadios
      ? (inputElement[0].parentNode.setAttribute("data-error-visible", true),
        inputElement[0].parentNode.setAttribute("data-error", errorMessage))
      : (inputElement.parentNode.setAttribute("data-error-visible", true),
        inputElement.parentNode.setAttribute("data-error", errorMessage));
  };

  // Ici on créer les conditions d'envoi du formulaire =>

  // Les conditions Ternaires, une forme d'écriture plus élaborée:

  /* On évalue d'abord la condition donnée. 
  Si la condition retourne vrai, alors on retourne l'erreur correspondant au champ,
   ainsi que son message d'erreur*/

  /*Ici cet exemple => Le champs du prénom ne doit pas être vide et
 il doit aussi contenir au minimum 2 caractères.*/
  data.firstName.length < 2
    ? (setError(
        firstNameInput,
        "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
      ),
      (errors["firstName"] = true))
    : null;

  /*  Voici une autre forme d'écriture de condition classique =>

  if (data.firstName.length < 2) {
    setError(firstNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    errors["firstName"] = true;
  }
  */

  data.lastName.length < 2
    ? (setError(
        lastNameInput,
        "Veuillez entrer 2 caractères ou plus pour le champ du nom."
      ),
      (errors["lastName"] = true))
    : null;
  !data.email.match(emailRegex)
    ? (setError(emailInput, "Veuillez entrer une adresse email valide."),
      (errors["email"] = true))
    : null;
  !data.birthdate
    ? (setError(birthdateInput, "Vous devez entrer votre date de naissance."),
      (errors["birthdate"] = true))
    : null;
  !data.quantity.match(quantityRegex)
    ? (setError(quantityInput, "Veuillez entrer un nombre valide."),
      (errors["quantity"] = true))
    : null;
  checked.length < 1
    ? (setError(locationRadios, "Vous devez choisir une option."),
      (errors["location"] = true))
    : null;
  !touCheckbox.checked
    ? (setError(
        touCheckbox,
        "Vous devez vérifier que vous acceptez les termes et conditions."
      ),
      (errors["tos"] = true))
    : null;
  console.log(Object.keys(errors).length);
  if (Object.keys(errors).length === 0) {
    confirmationForm();
  }
};

// DOM
const confirmationForm = () => {
  const modalBody = document.querySelector(".modal-body");
  form.style.display = "none";
  modalBody.style.height = "90vh"; //
  modalBody.style.display = "flex";
  modalBody.style.alignItems = "center";

  const modalContent = document.createElement("div");
  modalContent.style.margin = "auto auto";
  modalContent.style.display = "flex";
  modalContent.style.flexDirection = "column";
  modalContent.style.justifyContent = "center";
  modalContent.style.height = "100%";

  const confirmationTitle = document.createElement("h3");
  confirmationTitle.textContent = "Merci pour votre inscription";
  confirmationTitle.style.textAlign = "center";
  confirmationTitle.style.margin = "16px 0";
  confirmationTitle.style.textContent = "auto";
  confirmationTitle.style.flex = "3";
  confirmationTitle.style.marginTop = "65%";

  const confirmationButton = document.createElement("button");
  confirmationButton.classList.add("button");
  confirmationButton.classList.add("btn-submit");
  confirmationButton.textContent = "Fermer";
  confirmationButton.addEventListener("click", () => {
    form.submit();
  });
  // On insère des éléments dans le modalBody
  modalBody.appendChild(modalContent);
  modalContent.appendChild(confirmationTitle);
  modalContent.appendChild(confirmationButton);
};
