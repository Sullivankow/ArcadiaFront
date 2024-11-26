

//Mise en place du menu burger 
const menuHamburger = document.querySelector(".menu-hamburger")
const navLinks = document.querySelector(".nav-links")

menuHamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-menu')
})





const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");
//URL à changer lors du déploiement 
const apiUrl = "https://127.0.0.1:8000/api/";

signoutBtn.addEventListener("click", signout);
getInfosUser();

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

   
    


    if (userConnected || role == "ROLE_ADMIN" || role == "ROLE_VETERINAIRE" || role == "ROLE_EMPLOYE") {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        gestionButton.style.display = 'inline-block';
        

        switch (role) {
            case "ROLE_ADMIN":
                alert("Bienvenue adminisitrateur");

                break;
            case "ROLE_VETERINAIRE":
                alert("Bienvenue vétérinaire");
                break;

            case "ROLE_EMPLOYE":
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





//Fonction pour récupérer les informations utilisateur 
function getInfosUser(){
    console.log("récupération des infos de l'utilisateur");
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(apiUrl + "account/me", requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations utilisateur");
        }
    })
    .then(result => {
        if (result) {
                console.log("Informations utilisateur :", result); //Renvoie les infos utilisateurs dans la console
            }
    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}

















