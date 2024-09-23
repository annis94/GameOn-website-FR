// Fonction modifie le menu de navigation en version mobile
function editNav() {
  let x = document.getElementById("myTopnav");
  x.classList.toggle("responsive"); // Ajoute ou retire la classe "responsive" en fonction de sa présence
}



const modalbg = document.querySelector(".bground"); 
const modalBtn = document.querySelectorAll(".modal-btn"); 
const closeBtn = document.querySelector(".close"); 
const form = document.querySelector("form[name='reserve']"); 
const confirmationMessage = document.getElementById("confirmationMessage"); 

// Fonction qui affiche ou masque les éléments
function toggleDisplay(element, show) {
  element.style.display = show ? "block" : "none";
}

// Ajoute un événement pour ouvrir la boîte modale quand un bouton est cliqué
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
  toggleDisplay(modalbg, true);
  toggleDisplay(form, true);
  toggleDisplay(confirmationMessage, false);
}));

// Ajoute un événement pour fermer la boîte modale quand le bouton est cliqué
closeBtn.addEventListener("click", () => toggleDisplay(modalbg, false));

// Ajoute un événement pour gérer la soumission du formulaire
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche l'envoi par défaut du formulaire

  // ca vérifie si tous les champs sont bien remplis
  if (validate()) {
    toggleDisplay(form, false); // Cache le formulaire
    toggleDisplay(confirmationMessage, true); // Affiche le message de confirmation
  }
});



function validate() {
  let isValid = true;

  // Récupération des éléments des champs
  const firstNameElement = document.getElementById('first');
  const lastNameElement = document.getElementById('last');
  const emailElement = document.getElementById('email');
  const birthdateElement = document.getElementById('birthdate');
  const quantityElement = document.getElementById('quantity');
  const termsElement = document.getElementById('checkbox1');

  // Réinitialisation des messages d'erreur
  document.querySelectorAll('.formData').forEach((el) => {
    el.setAttribute('data-error', '');
    el.setAttribute('data-error-visible', 'false');
  });

  // Vérification du prénom
  const firstName = firstNameElement.value.trim();
  if (!firstName || firstName.length < 2) {
    const formData = firstNameElement.closest('.formData');
    formData.setAttribute('data-error', 'Le prénom doit avoir au moins 2 caractères.');
    formData.setAttribute('data-error-visible', 'true');
    isValid = false;
  }

  // Vérification du nom
  const lastName = lastNameElement.value.trim();
  if (!lastName || lastName.length < 2) {
    const formData = lastNameElement.closest('.formData');
    formData.setAttribute('data-error', 'Le nom doit avoir au moins 2 caractères.');
    formData.setAttribute('data-error-visible', 'true');
    isValid = false;
  }

  // Vérification de l'email
  const email = emailElement.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    const formData = emailElement.closest('.formData');
    formData.setAttribute('data-error', 'Veuillez entrer une adresse email valide.');
    formData.setAttribute('data-error-visible', 'true');
    isValid = false;
  }

  // Vérification de la date de naissance (utilisateur doit avoir au moins 18 ans)
  const birthdateValue = new Date(birthdateElement.value);
  const today = new Date();
  const age = today.getFullYear() - birthdateValue.getFullYear();
  const monthDiff = today.getMonth() - birthdateValue.getMonth();

  if (!birthdateElement.value || age < 18 || (age === 18 && monthDiff < 0)) {
    const formData = birthdateElement.closest('.formData');
    formData.setAttribute('data-error', 'Vous devez avoir au moins 18 ans.');
    formData.setAttribute('data-error-visible', 'true');
    isValid = false;
  }

  // Vérification de la quantité
  const quantity = quantityElement.value.trim();
  if (!quantity || isNaN(quantity) || quantity < 0) {
    const formData = quantityElement.closest('.formData');
    formData.setAttribute('data-error', 'Veuillez entrer un nombre valide pour le nombre de concours.');
    formData.setAttribute('data-error-visible', 'true');
    isValid = false;
  }

  // Vérification que l'utilisateur a sélectionné un tournoi
  const locationChecked = document.querySelector('input[name="location"]:checked');
  if (!locationChecked) {
    const locationField = document.querySelector('input[name="location"]').closest('.formData');
    locationField.setAttribute('data-error', 'Veuillez sélectionner un tournoi.');
    locationField.setAttribute('data-error-visible', 'true');
    isValid = false;
  }

  // Vérification des conditions d'utilisation
  if (!termsElement.checked) {
    const formData = termsElement.closest('.formData');
    formData.setAttribute('data-error', 'Vous devez accepter les conditions d\'utilisation.');
    formData.setAttribute('data-error-visible', 'true');
    isValid = false;
  }

  return isValid; // Empêche la soumission si des erreurs sont présentes
}
