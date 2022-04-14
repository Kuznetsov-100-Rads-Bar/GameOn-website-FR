const editNav = () => {
  const x = document.getElementById("myTopnav");
  x.className === "topnav"
    ? (x.className += " responsive")
    : (x.className = "topnav");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// On créer la variable , avec cette constante qui permet de cibler l'élément du DOM ayant la classe "close".
const modalCloseButton = document.querySelector(".close");

// Je sélectionne et je stocke l'élément nécessaire en récupérant cet élément sur lequel on veut détecter
const form = document.getElementById("form");

/* Je détecte la validation du formulaire =>
Ecoute l'evenement (submit: envoi du fomulaire (quand le bouton est pressé)) 
et lance la fonction validateForm(). */
form.addEventListener("submit", (event) => validateForm(event));

// Une fonction d'ouverture de la modale
modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalbg.style.display = "block"; // Apparition de la modale, après le click
  })
);

/* Il s'agit d'un écouteur d'événements JavaScript. 
 Lorsque l'utilisateur clique sur le bouton de fermeture, la modale est fermée.
 */
modalCloseButton.addEventListener("click", () => {
  // La fonction pour faire disparaître la modale.
  modalbg.style.display = "none"; // Disparition de la modale, après le click.
});

/* L'action par défaut du formulaire ne soit pas pris en compte par le navigateur 
en utilisant la méthode preventDefault pour empêcher le comportement par défaut
 de cet élément lors du click  */
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
   * Ici on va récupérer des éléments du HTML du formulaire
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
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const quantityRegex = /\d+/; // Nombre uniquement

  /*
  On récupére les valeurs rentrées dans les champs dans un tableau d'objets "data"
   */
  const data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    birthdate: birthdateInput.value,
    quantity: quantityInput.value,
  };

  /* Dates handler */
  const selectedDate = new Date(data.birthdate);
  const currentDate = new Date(Date.now());

  // On initialise un tableau vide d'erreurs
  const errors = {};

  // Pour chaque champs désactiver les erreurs ou réinitialiser.
  formData.forEach((formData) => {
    formData.setAttribute("data-error-visible", false);
    formData.setAttribute("data-error", "");
  });

  // Affiche les messages d'erreurs si condition pas respecté
  const setError = (inputElement, errorMessage) => {
    inputElement === locationRadios
      ? (inputElement[0].parentNode.setAttribute("data-error-visible", true),
        inputElement[0].parentNode.setAttribute("data-error", errorMessage)) //message error (red)
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
  /* if (data.lastName.length < 2) {
  setError(lastNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  errors["lasttName"] = true;
  */

  !data.email.match(emailRegex)
    ? (setError(emailInput, "Veuillez entrer une adresse email valide."),
      (errors["email"] = true))
    : null;

  // On créer une condition
  !data.birthdate ||
  selectedDate.getFullYear() > currentDate.getFullYear() - 12 || // si la date selectionnée est superieur à la date actuelle  -12 ans
  selectedDate.getFullYear() < currentDate.getFullYear() - 120 // si la date selectionnée est inférieur à la date actuelle  -120 ans
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

  // Ici on verifie les conditions de validationdu du formulaire.
  if (Object.keys(errors).length === 0) {
    // Si les conditions ne sont pas respectées, alors le formulaire ne sera pas envoyé.
    confirmationForm();
  } else {
    console.error({ Errors: Object.keys(errors) });
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
