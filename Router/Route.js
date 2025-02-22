export default class Route {
  constructor(url, title, pathHtml, authorize, pathJS = "") {
    this.url = url;
    this.title = title;
    this.pathHtml = pathHtml;
    this.pathJS = pathJS;
    this.authorize = authorize;
  }
}

/* 
 [] > Tout le monde peut y accéder
 ["disconnected"] > réserver aux utilisateurs déconnectés
 ["veterinaire" "employe"] > réserver aux utilisateurs ayant de le rôle de vétérinaire et aux amployé
 ["admin"] > réservé aux utilisateurs avec le rôle admin
 ["admin", "veterinaire", "employe"] > réserver aux utilisateurs avec le rôle admin, vétérinaire ou employé
 */
