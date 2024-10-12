import Route from "./Route.js";


//On définit nos routes ici

export const allRoutes = [

    new Route("/", "Accueil", "/pages/home.html", [] ),
    new Route("/contact", "Contact", "/pages/contact.html", []),
    new Route("/service", "Nos services", "/pages/service.html", []),
    new Route("/aPropos", "À propos", "/pages/aPropos.html", []),
    new Route("/habitat", "Les habitats", "/pages/habitat.html", []),
    new Route("/signin", "Connexion", "/pages/auth/signin.html",  ["disconnected"], "/js/auth/signin.js"),
    new Route("/menu-dashboard", "Interface Utilisateur", "/pages/dashboard/menu-dashboard.html", ["admin", "veterinaire", "employe"]),
    new Route("/compte-rendus", "Compte rendu vétérinaire", "/pages/dashboard/compte-rendus.html", ["veterinaire"]),
    new Route("/dash-animal", "Menu Animaux", "/pages/dashboard/animal.html", ["veterinaire", "employe"]),
    new Route("/dash-habitat", "Menu Habitat", "/pages/dashboard/habitat.html",  ["admin", "veterinaire",]),
    new Route("/dash-users", "Menu utilisateurs", "/pages/dashboard/users.html",  ["admin", "veterinaire", "employe"]),
    new Route("/horaires", "Menu horaires", "/pages/dashboard/horaires.html",  ["admin"]),
    new Route("/reviews", "Menu avis", "/pages/dashboard/reviews.html",  ["admin", "employe"]),
    new Route("/authorize", "Autorisation", "/pages/authorize.html", []),



];



//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia";