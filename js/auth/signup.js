//Implémenter le js de ma page d'inscription

const inputMail = document.getElementById("EmailInput");
const btnValidation = document.getElementById("btn-validation-inscription");


//Ecouteur d'évènement pour la validation de formulaire

inputMail.addEventListener("keyup", validateForm);


function validateForm() {
    
    const mailOk = validateMail(inputMail);

    if (mailOk) {
        btnValidation.disabled = false;
        console.log("bouton activé");
    } else {
        btnValidation.disabled = true;
        console.log("bouton désactivé");
    }

}


//Vérification email avant soumission

function validateMail(input) {

    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {

        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;

    }
};


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
