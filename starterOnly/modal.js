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
  // Récupération des valeurs des champs
  const firstName = document.getElementById('first').value.trim();
  const lastName = document.getElementById('last').value.trim();
  const email = document.getElementById('email').value.trim();
  const birthdate = document.getElementById('birthdate').value.trim();

  // Vérification que le prénom a au moins 2 caractères
  if (!firstName || firstName.length < 2) {
    alert('Le prénom doit avoir au moins 2 caractères.'); // Affiche une alerte si le prénom est trop court
    return false; // Empêche l'envoi du formulaire
  }
  
  // Vérification des autres champs...
  if (!lastName || lastName.length < 2) {
    alert('Le nom de famille doit avoir au moins 2 caractères.');
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    alert('Veuillez entrer une adresse email valide.');
    return false;
  }

   // Vérification de la quantité saisie pour les concours
   const quantity = document.getElementById('quantity').value.trim();
   if (!quantity || isNaN(quantity) || quantity < 0) {
     alert('Veuillez entrer un nombre valide pour le nombre de concours.');
     return false;
   }

   const locationChecked = document.querySelector('input[name="location"]:checked');
    if (!locationChecked) {
      alert('Veuillez sélectionner un tournoi.');
      return false;
    }

    const termsAccepted = document.getElementById('checkbox1').checked;
    if (!termsAccepted) {
      alert('Vous devez accepter les conditions d\'utilisation.');
      return false;
    }



  return true; 
}

