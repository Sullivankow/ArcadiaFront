import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";


//Création d'une route pour la page 404 (page inrouvable)
const route404 = new Route("404", "Page Introuvable", "/pages/404.html", []);


//Fonction pour récupérer la route correspondant à une url donnée
const getRouteByUrl = (url) => {
    let currentRoute = null;

    //Parcours toutes les routes pour trouver la correspondance
    allRoutes.forEach((element) => {
        if (element.utl == url) {
            currentRoute = element;
        }
    });

    //Si aucune correspondance n'est trouvée, on retourne la route 404
    if(currentRoute != null) {
        return currentRoute;
    } else {
        return route404;
    }
};


//Fonction pour charger le contenu de la page
const LoadContentPage = async () => {
    const path = window.location.pathname;

    //réupération de l'url actuelle
    const actualRoute = getRouteByUrl(path);

    //Vérifier les droits d'accès à la page
    const allRolesArray = actualRoute.authorize;
    if(allRolesArray.length > 0){
        if(allRolesArray.includes("disconnected")){
            if(isConnected()){
                window.location.replace("/");
            }
        }
     else {
        const roleUser = getRole();
        if(!allRolesArray.includes(roleUser)){
            window.location.replace("/");
        }
    }
}

//Récupération du contenu HTML de la route
const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
//Ajout du contenu HTML à l'élément avec l'ID "main-page"
document.getElementById("main-page").innerHTML = html


//Ajout du contenu JAVASCRIPT
if (actualRoute.pathJS !="") {
    //Création de la balise script
    let scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);


//Ajout de la balise script au corps du document 
document.querySelector("body").appendChild(scriptTag);

}

//Chargement du titre de la page 
document.title = actualRoute.title + " - " + websiteName;

//Afficher et masquer les éléments en fonction du rôle 
showAndHideElementsForRoles();

};


// Fonction pour gérer les évènements de routage (Clic sur les liens)
const routeEvent = (event) => {
    event = event || window.Event;
    event.preventDefault();

    //Mise à jour de l'URL dans l'historique du navigateur
    window.history.pushState({}, "", event.target.href);

    //Chargement du contenu de la nouvelle page
    LoadContentPage();
};

//Gestion de l'évènement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;

//Assignation de la fonction routeEvent à la propriété route de la fenêtre
window.route = routeEvent;

//Chargement du contenu de la page initial
LoadContentPage();

