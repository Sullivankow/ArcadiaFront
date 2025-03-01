import Route from "./Route.js";

//On définit nos routes ici

export const allRoutes = [
  //Les routes des pages visibles aux visiteurs
  new Route("/", "Accueil", "/pages/home.html", []),
  new Route("/contact", "Contact", "/pages/contact.html", []),
  new Route(
    "/service",
    "Nos services",
    "/pages/service.html",
    [],
    "/js/auth/signup.js"
  ),

  new Route(
    "/reviewForm",
    "Ajouter un avis",
    "/pages/form/reviewForm.html",
    []
  ),
  new Route(
    "/signin",
    "Connexion",
    "/pages/auth/signin.html",
    ["disconnected"],
    "/js/auth/signin.js"
  ),
  new Route(
    "/dash-habitat",
    "Menu Habitat",
    "/pages/dashboard/habitat.html",
    []
  ),

  //Routes des pages non visibles
  new Route(
    "/habitatForm",
    "Ajouter un habitat",
    "/pages/form/habitatForm.html",
    []
  ),
  new Route(
    "/serviceForm",
    "Ajouter un habitat",
    "/pages/form/serviceForm.html",
    []
  ),
  new Route(
    "/menu-dashboard",
    "Interface Utilisateur",
    "/pages/dashboard/menu-dashboard.html",
    ["ROLE_ADMIN", "ROLE_VETERINAIRE", "ROLE_EMPLOYE"]
  ),
  new Route(
    "/compte-rendus",
    "Compte rendu vétérinaire",
    "/pages/dashboard/compte-rendus.html",
    ["ROLE_ADMIN", "ROLE_VETERINAIRE"]
  ),
  new Route("/dash-animal", "Menu Animaux", "/pages/dashboard/animal.html", [
    "ROLE_VETERINAIRE",
    "ROLE_EMPLOYE",
    "ROLE_ADMIN",
  ]),

  new Route("/dash-users", "Menu utilisateurs", "/pages/dashboard/users.html", [
    "ROLE_ADMIN",
    "ROLE_VETERINAIRE",
    "ROLE_EMPLOYE",
    "/js/auth/signup.js",
  ]),
  new Route("/horaires", "Menu horaires", "/pages/dashboard/horaires.html", []),
  new Route("/reviews", "Menu avis", "/pages/dashboard/reviews.html", [
    "ROLE_ADMIN",
    "ROLE_EMPLOYE",
  ]),
  new Route("/authorize", "Autorisation", "/pages/authorize.html", []),
  new Route(
    "/users",
    "Les utilisateurs",
    "/pages/auth/signupUsers.html",
    ["ROLE_ADMIN"],
    "/js/auth/signup.js"
  ),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia";
