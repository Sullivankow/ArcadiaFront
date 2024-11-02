



//Mise en place du menu burger 
const menuHamburger = document.querySelector(".menu-hamburger")
const navLinks = document.querySelector(".nav-links")

menuHamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-menu')
})





const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");

signoutBtn.addEventListener("click", signout);

function getRole() {
    return getCookie(RoleCookieName);
}

function signout() {

    eraseCookie(RoleCookieName);
    eraseCookie(tokenCookieName);
    window.location.replace("/");
}



function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}


//METHODES COOKIES//
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1, c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}




/*Savoir si l'utilisateur est conecté ou non*/

function isConnected() {
    return !(getToken() == null || getToken == undefined);
}

// if(isConnected()){
//     alert("je suis connecté");
// } else {
//     alert("je ne suis as connecté");
// }






/* LES RÔLES
disconnected
connected (admin, vétérinaire, employé)
-admin
-vétérinaire
-employé
*/



//FONCTION POUR MASQUER LES ELEMENTS EN FONCTION DU ROLE//
function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();
    const loginButton = document.getElementById("signin-btn");
    const logoutButton = document.getElementById("signout-btn");
    const gestionButton = document.getElementById("gestion-btn");
    /*const dataShowEmp = document.querySelectorAll("[data-show]");*/

   
    


    if (userConnected || role == "admin" || role == "veterinaire" || role == "employe") {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        gestionButton.style.display = 'inline-block';
        

        switch (role) {
            case "admin":
                alert("Bienvenue adminisitrateur");

                break;
            case "veterinaire":
                alert("Bienvenue vétérinaire");
                break;

            case "employe":
alert("Bienvenue employé");
                
break;

            default:
                alert("Bienvenue");
        }

    } else {
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        gestionButton.style.display = 'none';
    }
}

