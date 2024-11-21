import Route from "./Route.js";


//On définit nos routes ici

export const allRoutes = [

    new Route("/", "Accueil", "/pages/home.html", [] ),
    new Route("/contact", "Contact", "/pages/contact.html", []),
    new Route("/service", "Nos services", "/pages/service.html", []),
    new Route("/aPropos", "À propos", "/pages/aPropos.html", []),
    new Route("/habitat", "Les habitats", "/pages/lesHabitats.html", []),
    new Route("/signin", "Connexion", "/pages/auth/signin.html",  ["disconnected"], "/js/auth/signin.js"),
    new Route("/menu-dashboard", "Interface Utilisateur", "/pages/dashboard/menu-dashboard.html", ["ROLE_ADMIN", "ROLE_VETERINAIRE", "ROLE_EMPLOYE"]),
    new Route("/compte-rendus", "Compte rendu vétérinaire", "/pages/dashboard/compte-rendus.html", ["ROLE_VETERINAIRE"]),
    new Route("/dash-animal", "Menu Animaux", "/pages/dashboard/animal.html", ["ROLE_VETERINAIRE", "ROLE_EMPLOYE"]),
    new Route("/dash-habitat", "Menu Habitat", "/pages/dashboard/habitat.html",  ["ROLE_ADMIN", "ROLE_VETERINAIRE",]),
    new Route("/dash-users", "Menu utilisateurs", "/pages/dashboard/users.html",  ["ROLE_ADMIN", "ROLE_VETERINAIRE","ROLE_EMPLOYE"]),
    new Route("/horaires", "Menu horaires", "/pages/dashboard/horaires.html",  ["ROLE_ADMIN"]),
    new Route("/reviews", "Menu avis", "/pages/dashboard/reviews.html",  ["ROLE_ADMIN", "ROLE_EMPLOYE"]),
    new Route("/authorize", "Autorisation", "/pages/authorize.html", []),
    new Route("/users", "Les utilisateurs", "/pages/auth/signupUsers.html", ["ROLE_ADMIN"], "/js/auth/signup.js"),



];



//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia";