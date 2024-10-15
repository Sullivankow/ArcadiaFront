
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






//FONCTION POUR APPELER l'API, CHARGER LES DONNEES ET LES INSERER DANS LE TABLEAU COMPTE RENDU */
function loadData() {
    fetch ('http://localhost/api.php') //METTRE L'URL DE l'API//
    .then(response => response.json()) //CONVERTIR EN FORMAT JSON//
    .then(data => {
        //SELECTIONNE LES ELEMENTS OÙ LES DONNEES QUI SERONT INSEREES//

        const tableauVet = document.getElementById("tableauVet");
        tableauVet.innerHTML = ''; //VIDE LE TABLEAU AVANT D'AJOUTER LES NOUVELLES LIGNES//

        //BOUCLE SUR CHAQUE COMPTE RENDU ET CREER UNE LIGNE DE TABLEAU POUR CHAQUE ELEMENT//
        data.forEach(item => {
            let row = `<tr>
               <td>${item.nom_animal}</td>
                    <td>${item.etat_animal}</td>
                    <td>${item.nourriture_grammes}</td>
                    <td>${item.date_passage}</td>
                </tr>`;
                tableauVet.innerHTML += row;
        });
    })
    .catch(error => console.error("Erreur:", error));
}


//CHARGE LES DONNEES AU CHARGEMENT DE LA PAGE//
window.onload = loadData;



//FONCTION POUR FILTER LE TABLEAU PAR NOM ET PAR ANIMAL//
function filterTable() {
    let filterName = document.getElementById("cherche-nom").value.toUpperCase();
    let filterDate = document.getElementById("cherche-date").value;
    let table = document.getElementById("tableauVet");
    let tr = table.getElementById("trVet");

    for (const element of tr) {
        let tdName = element.getElementByTagName("td")[0]; //NOM DE L'ANIMAL
        let tdDate = element.getElementByTagName("td")[3]; // DATE DE PASSAGE
        if(tdName && tdDate) {
            let nameValue = tdName.textContent || tdName.innerText;
            let dateValue = tdDate.textContent || tdDate.innerText;


            //CONDITION POUR LE FILTRAGE PAR NOM ET PAR DATE//
if (nameValue.toUpperCase().indexOf(filterName) > -1 && (filterDate ==="" || dateValue === filterDate)){
    element.style.display = ""; //AFFICHER LA LIGNE SI ELLE CORRESPONDAUX CRITERES
} else {
    element.style.display = none; //MASQUER LA LIGNE SI ELLE NE CORRESPOND PAS//
}

        }
    }
}


//FONCTION POUR TRIER LE TABLEAU PAR COLONNE NOM OU DATE//
function sortTable(columnIndex){
    let table = document.getElementById("tableauCompteRendu");
    let rows = table.rows;
    let switching = true;
    let shouldSwitch;
    let dir = "asc"; //DEFINIT LA DIRECTION DU TRI EN ASCENDANT//
    let switchCount = 0;

    //BOUCLE JUSQU'A CE QU'IL N'Y AIT PLUS DE CHANGEMENT A FAIRE//
    while(switching) {
        switching = false;
        let rowsArray = Array.from(rows).slice(1); //IGNORER l'ENTETE DU TABLEAU

        //BOUCLE à TRAVERS TOUTES LES LIGNES DU TABLEAU// 
        for (let i = 0; i < rowsArray.length - 1; i++) {
            shouldSwitch = false;
            let x = rowsArray[i].getElementByTagName("TD")[columnIndex];
            let y = rowsArray[i].getElementByTagName("TD")[columnIndex];

            if(dir ==="asc") {
                if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rowsArray[i].parentNode.insertBefore(rowsArray[i + 1], rowsArray[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}