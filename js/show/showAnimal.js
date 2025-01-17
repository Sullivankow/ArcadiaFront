
// Fonction pour récupérer les animaux depuis l'API
async function fetchAnimals() {
    try {
        // Création des en-têtes avec le token d'authentification
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken()); // Assurez-vous que getToken() retourne un token valide

        // Configuration des options pour la requête HTTP
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        // Requête API pour récupérer les animaux
        const response = await fetch(`${apiUrl}/animal/list`, requestOptions);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des animaux : ${response.status}`);
        }

        // Conversion de la réponse en JSON
        const animals = await response.json();
        console.log("Animaux récupérés :", animals);

        // Appel de la fonction pour afficher les animaux
        displayAnimals(animals);
    } catch (error) {
        console.error("Erreur lors de la récupération des animaux :", error.message);
        alert("Une erreur est survenue lors de la récupération des animaux.");
    }
}

// Fonction pour afficher les animaux dans le tableau HTML
function displayAnimals(animals) {
    const animalList = document.getElementById("animal-list");
    if (!animalList) {
        console.error("Erreur : L'élément avec l'ID 'animal-list' n'existe pas dans le DOM.");
        return;
    }

    animalList.innerHTML = ""; // Vide le tableau avant d'ajouter de nouveaux éléments

    if (Array.isArray(animals) && animals.length > 0) {
        animals.forEach(animal => {
            const row = document.createElement("tr");

            // Colonne ID
            const idAnimalCell = document.createElement("td");
            idAnimalCell.textContent = animal.id || "N/A";
            row.appendChild(idAnimalCell);

            // Colonne Prénom
            const nameCell = document.createElement("td");
            nameCell.textContent = animal.prenom || "Sans nom";
            row.appendChild(nameCell);



            //Colonne Etat
             const stateCell = document.createElement("td");
            stateCell.textContent = animal.etat || "Sans nom";
            row.appendChild(stateCell);


            // Colonne Actions
            const actionsCell = document.createElement("td");

            // Bouton Modifier
            const editButton = document.createElement("button");
            editButton.classList.add("btn-icon");
            editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
            editButton.addEventListener("click", () => editAnimal(animal.id));
            actionsCell.appendChild(editButton);

            // Bouton Supprimer
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("btn-icon");
            deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
            deleteButton.addEventListener("click", () => deleteAnimal(animal.id));
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);

            // Ajout de la ligne au tableau
            animalList.appendChild(row);
        });
    } else {
        // Si aucun animal trouvé
        const row = document.createElement("tr");
        const noAnimalCell = document.createElement("td");
        noAnimalCell.textContent = "Aucun animal trouvé.";
        noAnimalCell.colSpan = 5; // Fusionner les colonnes pour le message
        row.appendChild(noAnimalCell);
        animalList.appendChild(row);
    }
}

// Fonction pour modifier un animal
async function editAnimal(animalId) {
    const newAnimalName = prompt("Entrez le nouveau nom pour cet animal (laissez vide pour ne pas modifier) :");
    const newStateAnimal = prompt("Entrez le nouvel état pour cet animal (laissez vide pour ne pas modifier) :");

    if (!newAnimalName && !newStateAnimal) {
        alert("Aucune modification à effectuer.");
        return;
    }

    try {
        // Création des en-têtes avec le token d'authentification
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken());
        myHeaders.append("Content-Type", "application/json");

        // Préparation du corps de la requête
        const body = {};
        if (newAnimalName) body.prenom = newAnimalName;
        if (newStateAnimal) body.etat = newStateAnimal;

        // Configuration des options pour la requête HTTP
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(body)
        };

        // Requête API pour modifier l'animal
        const response = await fetch(`${apiUrl}/animal/edit/${animalId}`, requestOptions);

        if (response.ok) {
            alert("Les modifications ont été effectuées avec succès !");
            fetchAnimals(); // Recharge la liste des animaux
        } else {
            const errorMessage = await response.text();
            alert(`Erreur lors de la mise à jour : ${errorMessage}`);
        }
    } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue lors de la modification.");
    }
}

// Fonction pour supprimer un animal
async function deleteAnimal(animalId) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet animal ?")) return;

    try {
        // Création des en-têtes avec le token d'authentification
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken());

        // Requête API pour supprimer l'animal
        const response = await fetch(`${apiUrl}/animal/delete/${animalId}`, {
            method: 'DELETE',
            headers: myHeaders
        });

        if (response.ok) {
            alert("Animal supprimé avec succès !");
            fetchAnimals(); // Recharge la liste des animaux
        } else {
            const errorMessage = await response.text();
            alert(`Erreur lors de la suppression : ${errorMessage}`);
        }
    } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue lors de la suppression.");
    }
}


// Appel initial pour charger les animaux au chargement de la page
document.addEventListener("DOMContentLoaded", fetchAnimals);


