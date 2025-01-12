

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




// Exemple des fonctions Modifier et Supprimer (simples pour le moment)
async function editUser(username) {
    const newRole = prompt("Entrez le nouveau rôle pour cet utilisateur :");
    if (newRole) {
        try {
            const response = await fetch(`${apiUrl}/account/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ roles: [newRole] }),
            });

            if (response.ok) {
                alert("Rôle mis à jour avec succès !");
                fetchUsers(); // Recharge les utilisateurs
            } else {
                alert("Erreur lors de la mise à jour du rôle.");
            }
        } catch (error) {
            console.error("Erreur :", error);
            alert("Une erreur est survenue.");
        }
    }
}

async function deleteUser(userId) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        try {
            const response = await fetch(`${apiUrl}/users`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Utilisateur supprimé avec succès !");
                fetchUsers(); // Recharge les utilisateurs
            } else {
                alert("Erreur lors de la suppression de l'utilisateur.");
            }
        } catch (error) {
            console.error("Erreur :", error);
            alert("Une erreur est survenue.");
        }
    }
}

















// Fonction pour afficher les utilisateurs dans le tableau HTML
function displayUsers(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // Vide le tableau avant d'ajouter de nouveaux éléments

    if (Array.isArray(users) && users.length > 0) {
        users.forEach(user => {
            const row = document.createElement("tr"); // Crée une ligne pour chaque utilisateur



  // Colonne id
            const idCell = document.createElement("td");
            idCell.textContent = user.id;
            row.appendChild(idCell);

            // Colonne Email
            const emailCell = document.createElement("td");
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            // Colonne Rôles
            const rolesCell = document.createElement("td");
            const roles = Array.isArray(user.roles) ? user.roles.join(", ") : "Aucun rôle";
            rolesCell.textContent = roles;
            row.appendChild(rolesCell);


 // Colonne Actions
            const actionsCell = document.createElement("td");

            // Bouton Modifier
            const editButton = document.createElement("button");
            editButton.classList.add("btn-icon");
            editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
            editButton.addEventListener("click", () => editUser(user.id));
            actionsCell.appendChild(editButton);

            // Bouton Supprimer
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("btn-icon");
            deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
            deleteButton.addEventListener("click", () => deleteUser(user.id));
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);

          

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


