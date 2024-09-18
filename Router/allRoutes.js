import Route from "./Route.js";


//On définit nos routes ici

export const allRoutes = [

    new Route("/", "Accueil", "/pages/home.html" ),
    new Route("/contact", "Contact", "/pages/contact.html"),
    new Route("/service", "Nos services", "/pages/service.html"),
    new Route("/aPropos", "À propos", "/pages/aPropos.html"),
    new Route("/habitat", "Les habitats", "/pages/habitat.html"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html"),



];



//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia";