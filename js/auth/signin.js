
/*Système de connexion*/
const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");


btnSignin.addEventListener("click", checkCredentials);



//Vérifier mail et password//
function checkCredentials() {

    //Ici il faudra appeler l'api pour vérifier les credentials en BDD//

    if (mailInput.value == "test@mail.com" && passwordInput.value == "123") {
        alert("Vous être connecté");

//Ici il faudra récupérer le vrai token//
const token = "fejfoejfoiezjfoiejofijzeoifjeiozfji";
setToken(token);

//Placer ce token en cookie//

setCookie(RoleCookieName, "admin", 7);
        window.location.replace("/menu-dashboard");

    }
    else {
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}







