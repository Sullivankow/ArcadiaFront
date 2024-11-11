//Implémenter le js de ma page d'inscription

const inputMail = document.getElementById("EmailInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const formInscription = document.getElementById("user-form");


//Ecouteur d'évènement pour la validation de formulaire

inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup",validateForm);
btnValidation.addEventListener("click", InscrireUtilisateur);



//Fonction de validation
function validateForm() {
    
    const mailOk = validateMail(inputMail);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmOk = validateConfirmationPassword(inputPassword, inputValidationPassword);

    if (mailOk && passwordOk && passwordConfirmOk) {
        btnValidation.disabled = false;
        console.log("bouton activé");
    } else {
        btnValidation.disabled = true;
        console.log("bouton désactivé");
    }

}

//Fonction pour vérifier la confirmation du mot de passe

function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    const message = document.getElementById("confirm-password-message");
if(inputPwd.value == inputConfirmPwd.value){
    inputConfirmPwd.classList.add("is-valid");
    inputConfirmPwd.classList.remove("is-invalid");

    //Message lorsque le mot de passe est identique 
    message.textContent = "Le mot de passe est identique";
    message.style.color = "green"; //Message en vert pour valider
    console.log("identique");
    return true;
} else{
    inputConfirmPwd.classList.add("is-invalid");
    inputConfirmPwd.classList.remove("is-valid");

    //Message lorsque le mot de passe n'est pas identique
    message.textContent = "Le mot de passe n'est pas identique";
    message.style.color = "red";
    console.log("pas identique");
    return false;
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

//Fonction pour inscrire un utilisateur avec un appel FETCH vers l'api
function InscrireUtilisateur(){
   
    let dataForm = new FormData(formInscription);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    let myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
myHeaders.append("Content-Type", "application/json");

// Convertit les données du formulaire en une chaîne JSON
let raw = JSON.stringify({

  "email": dataForm.get("Email"),
  "password": dataForm.get("Password"),
  "Roles": [dataForm.get("role")]
  
  
});
// Configure les options de la requête HTTP
let requestOptions = {
    // Méthode de la requête : "POST" pour envoyer des données au serveur
  method: 'POST',
   // Définit les en-têtes de la requête en utilisant l'objet Headers créé précédemment
  headers: myHeaders,
  // Corps de la requête : les données JSON converties en chaîne
  body: raw,
  // Redirection à suivre en cas de besoin ("follow" suit automatiquement les redirections)
   redirect: 'follow'
 
};

fetch("https://127.0.0.1:8000/api/registration", requestOptions)
  .then(response => {
    if(response.ok){
        return response.json();
    }
    else{
        alert("Erreur lors de l'inscription");
    }
  })

  .then(result => {
    alert("Bravo vous êtes maintenant inscrit, vous pouvez vous connecter");
        document.location.href="/signin";
  })
  .catch(error => console.log('error', error));
}


























