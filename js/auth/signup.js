//Implémenter le js de ma page d'inscription
const inputNom = document.getElementById("NomInput");
const inputMail = document.getElementById("NomInput");
const btnValidation = document.getElementById("btn-validation-inscription");


//Ecouteur d'évènement pour la validation de formulaire
inputNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);


function validateForm(){
const nomOk = validateRequired(inputNom);
const mailOk = validateMail(inputMail);

if(nomOk && mailOk){
    btnValidation.disabled = false;
} else {
    btnValidation.disabled = true;
}

}


function validateMail(input){

//Définir mon regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mailUser = input.value;
if(mailUser.match(emailRegex)){
    input.classList.add("valid");
    input.classList.remove("invalid");
    return true;
} else {
    
    input.classList.remove("invalid");
    input.classlist.add("valid");
    return false;
    
}
}


function validateRequired(input){
if(input.value != ''){
    input.classList.add("valid");
    input.classList.remove("invalid");
    return true;
} else {
    
    input.classList.remove("invalid");
    input.classlist.add("valid");
    return false;
}
}
