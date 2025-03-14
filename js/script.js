//Mise en place du menu burger
const menuHamburger = document.querySelector(".menu-hamburger");
const navLinks = document.querySelector(".nav-links");

menuHamburger.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-menu");
});

const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");
const apiUrl = "https://upbeat-happiness-production.up.railway.app"; //URL back en ligne

// const apiUrl = "http://localhost:8081"; //URL locale
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
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (const element of ca) {
    let c = element;
    while (c.startsWith(" ")) c = c.substring(1, c.length);
    if (c.startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

/*Savoir si l'utilisateur est conecté ou non*/

function isConnected() {
  return !(getToken() == null || getToken == undefined);
}

//FONCTION POUR MASQUER LES ELEMENTS EN FONCTION DU ROLE//
function showAndHideElementsForRoles() {
  const userConnected = isConnected();
  const role = getRole();
  const loginButton = document.getElementById("signin-btn");
  const logoutButton = document.getElementById("signout-btn");
  const gestionButton = document.getElementById("gestion-btn");

  if (
    userConnected ||
    role == "ROLE_ADMIN" ||
    role == "ROLE_VETERINAIRE" ||
    role == "ROLE_EMPLOYE"
  ) {
    loginButton.style.display = "none";
    logoutButton.style.display = "inline-block";
    gestionButton.style.display = "inline-block";

    switch (role) {
      case "ROLE_ADMIN":
        console.log("Bienvenue adminisitrateur");

        break;
      case "ROLE_VETERINAIRE":
        console.log("Bienvenue vétérinaire");
        break;

      case "ROLE_EMPLOYE":
        console.log("Bienvenue employé");

        break;

      default:
        alert("Bienvenue");
    }
  } else {
    loginButton.style.display = "inline-block";
    logoutButton.style.display = "none";
    gestionButton.style.display = "none";
  }
}

//Fonction pour récupérer les infos utilisateurs
async function getInfosUser() {
  try {
    console.log("Récupération des infos de l'utilisateur");

    // Création des en-têtes avec le token d'authentification.
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    // Configuration des options pour la requête HTTP.
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // Utilisation de `await` pour effectuer la requête.
    const response = await fetch(`${apiUrl}/api/account/me`, requestOptions);

    //Vérification explicite de la réponse.
    if (!response.ok) {
      console.error("Impossible de récupérer les informations utilisateur");
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    // Extraction et affichage des données JSON.
    const result = await response.json();
    console.log("Informations utilisateur :", result);

    // Retourne éventuellement les informations utilisateur si besoin.
    return result;
  } catch (error) {
    // `catch` pour capturer les erreurs réseau ou autres.
    console.error(
      "Erreur lors de la récupération des données utilisateur :",
      error
    );
  }
}

///////////////////////////////
//////////////////////////////
//Fonction pour envoyer un mail via la page de contact

document.addEventListener("DOMContentLoaded", function () {
  // On attend 500ms après que le DOM est chargé avant de lancer le script
  setTimeout(() => {
    const formContact = document.getElementById("form-contact");

    if (!formContact) {
      console.error(
        "Le formulaire avec l'id 'form-contact' n'a pas été trouvé."
      );
      return;
    }

    formContact.addEventListener("submit", async function (event) {
      event.preventDefault();

      // On récupère les valeurs des champs et on enlève les espaces inutiles
      const nom = document.getElementById("nomContact").value.trim();
      const email = document.getElementById("emailContact").value.trim();
      const message = document.getElementById("messageContact").value.trim();
      const messageElement = document.getElementById("messageElementContact");

      // Vérification basique : tous les champs doivent être remplis
      if (!nom || !email || !message) {
        messageElement.textContent = "Veuillez saisir tous les champs";
        messageElement.style.color = "red";
        return;
      }

      const submitButton = formContact.querySelector("button[type='submit']");
      submitButton.disabled = true;

      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          nom: nom,
          email: email,
          message: message,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

        const response = await fetch(`${apiUrl}/api/contact`, requestOptions);

        if (!response.ok) {
          throw new Error(
            `Erreur lors de l'envoi du formulaire: ${response.status}`
          );
        }

        messageElement.textContent = "Email envoyé avec succès";
        messageElement.style.color = "green";

        // Réinitialiser les champs après envoi
        formContact.reset();
      } catch (error) {
        console.error("Erreur :", error);
        messageElement.textContent = "Impossible d'envoyer l'email";
        messageElement.style.color = "red";
      } finally {
        submitButton.disabled = false;
      }
    });
  }, 500); // 500ms après le DOMContentLoaded, tu peux ajuster ce délai si nécessaire
});

/////////////////////////
///GESTION DES ERREURS DANS LE NAVIGATEUR///
////////////////////////

// Désactiver tous les logs et erreurs dans la console
console.log = function () {};
console.warn = function () {};
console.error = function () {};
console.debug = function () {};
console.info = function () {};

window.onerror = function () {
  return true; // Empêche l'affichage des erreurs
};

window.addEventListener(
  "error",
  function (event) {
    event.preventDefault(); // Bloque les erreurs
  },
  true
);
