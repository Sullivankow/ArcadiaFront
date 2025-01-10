

// Fonction pour récupérer les utilisateurs depuis l'API
async function fetchUsers() {
    try {
       
 // Création des en-têtes avec le token d'authentification.
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken());

           // Configuration des options pour la requête HTTP.
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }

        const response = await fetch(`${apiUrl}/users`, requestOptions);
        if (!response.ok) {
            console.error("Impossible de récupérer la liste des utilisateurs");
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

         const users = await response.json();
        displayUsers(users); // Appelle la fonction pour afficher les utilisateurs


    }catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error.message);
}
}


// // Fonction pour afficher les utilisateurs dans la liste HTML
// function displayUsers(users) {
//     const userList = document.getElementById("user-list");
//     userList.innerHTML = ""; // Vide la liste avant d'ajouter de nouveaux éléments

//     users.forEach(user => {
//         const listItem = document.createElement("li");
//         listItem.textContent = `${user.email} (${user.roles.join(", ")})`; // Exemple : email (ROLE_ADMIN, ROLE_USER)
//         userList.appendChild(listItem);
//     });
// }








// Fonction pour afficher les utilisateurs dans le tableau HTML
function displayUsers(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // Vide le tableau avant d'ajouter de nouveaux éléments

    if (Array.isArray(users) && users.length > 0) {
        users.forEach(user => {
            const row = document.createElement("tr"); // Crée une ligne pour chaque utilisateur

            // Colonne Email
            const emailCell = document.createElement("td");
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            // Colonne Rôles
            const rolesCell = document.createElement("td");
            const roles = Array.isArray(user.roles) ? user.roles.join(", ") : "Aucun rôle";
            rolesCell.textContent = roles;
            row.appendChild(rolesCell);

            // Ajoute la ligne au tableau
            userList.appendChild(row);
        });
    } else {
        // Si aucun utilisateur trouvé, insérer un message dans le tableau
        const row = document.createElement("tr");
        const noUserCell = document.createElement("td");
        noUserCell.textContent = "Aucun utilisateur trouvé.";
        noUserCell.colSpan = 2; // Fusionner les colonnes pour le message
        row.appendChild(noUserCell);
        userList.appendChild(row);
    }
}



// Appel initial pour charger les utilisateurs au chargement de la page
document.addEventListener("DOMContentLoaded", fetchUsers);