//Implémenter le js de ma page d'inscription

const inputMail = document.getElementById("EmailInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const inputPassword = document.getElementById("PasswordInput");


//Ecouteur d'évènement pour la validation de formulaire

inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);



//Fonction de validation
function validateForm() {
    
    const mailOk = validateMail(inputMail);
    const passwordOk = validatePassword(inputPassword);

    if (mailOk && passwordOk) {
        btnValidation.disabled = false;
        console.log("bouton activé");
    } else {
        btnValidation.disabled = true;
        console.log("bouton désactivé");
    }

}

//Vérification password avant soumission
function validatePassword(input) {

    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    const message = document.getElementById("password-message"); // Sélection du message
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        
         // Message lorsque le mot de passe est robuste
        message.textContent = "Le mot de passe est assez robuste.";
        message.style.color = "green";  // Message en vert pour valider
        return true;
    } else {

        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
         // Définir le message d'erreur selon les critères non remplis
        message.textContent = "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole spécial.";
       message.style.color = "red";  // Message en rouge pour erreur
        return false;
    
    }
};

//Vérification email avant soumission

function validateMail(input) {

    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    const message = document.getElementById("email-message");
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");

         // Message lorsque l'email est valide
        message.textContent = "L'adresse email est valide.";
        message.style.color = "green";
        return true;
    } else {

        input.classList.remove("is-valid");
        input.classList.add("is-invalid");

        // Message d'erreur si l'email n'est pas au bon format
        message.textContent = "Veuillez entrer une adresse email valide (exemple@domaine.com).";
        message.style.color = "red";
        return false;
    
    }
};

//Fonction de de validation pour les champs requis
function validateRequired(input) {
    if (input.value !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {

        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
