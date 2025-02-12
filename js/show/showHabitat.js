// Fonction pour récupérer les habitats depuis l'API
async function fetchHabitats() {
  try {
    // Création des en-têtes avec le token d'authentification
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken()); // getToken() retourne un token valide

    // Configuration des options pour la requête HTTP
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // Requête API pour récupérer les animaux
    const response = await fetch(`${apiUrl}/habitat/show`, requestOptions);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des habitats : ${response.status}`
      );
    }

    // Conversion de la réponse en JSON
    const habitats = await response.json();
    console.log("Habitats récupérés :", habitats);

    // Appel de la fonction pour afficher les Habitats
    displayHabitats(habitats);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des habitats :",
      error.message
    );
    console.log(
      "Une erreur est survenue lors de la récupération des habitats."
    );
  }
}

// Fonction pour afficher les animaux dans le tableau HTML
function displayHabitats(habitats) {
  const habitatList = document.getElementById("habitat-list");
  if (!habitatList) {
    console.error(
      "Erreur : L'élément avec l'ID 'animal-list' n'existe pas dans le DOM."
    );
    return;
  }

  habitatList.innerHTML = ""; // Vide le tableau avant d'ajouter de nouveaux éléments

  if (Array.isArray(habitats) && habitats.length > 0) {
    habitats.forEach((habitat) => {
      const row = document.createElement("tr");

      // Colonne ID
      const idHabitatCell = document.createElement("td");
      idHabitatCell.textContent = habitat.id || "N/A";
      row.appendChild(idHabitatCell);

      // Colonne Nom
      const nameHabitatCell = document.createElement("td");
      nameHabitatCell.textContent = habitat.nom || "Sans nom";
      row.appendChild(nameHabitatCell);

      //Colonne Description
      const descriptionHabitatCell = document.createElement("td");
      descriptionHabitatCell.textContent = habitat.description || "Sans nom";
      row.appendChild(descriptionHabitatCell);

      //Colonne Commentaire
      const commentaireHabitatCell = document.createElement("td");
      commentaireHabitatCell.textContent =
        habitat.commentaire_habitat || "Sans nom";
      row.appendChild(commentaireHabitatCell);

      // Colonne Images
      const imagesHabitatCell = document.createElement("td");
      if (habitat.images && habitat.images.length > 0) {
        habitat.images.forEach((image) => {
          const imageElement = document.createElement("img");
          imageElement.src = image.image_Path; // URL de l'image
          imageElement.alt = "Image de l'habitat";
          imageElement.style.width = "50px"; // Taille de l'image (à ajuster selon le besoin)
          imageElement.style.height = "auto"; // Taille de l'image (à ajuster selon le besoin)
          imagesHabitatCell.appendChild(imageElement);

          // Bouton de modification de l'image
          const editButton = document.createElement("button");
          editButton.classList.add("btn-icon");
          editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
          editButton.addEventListener("click", () =>
            editImage(habitat.id, image.id, index)
          );
          imagesHabitatCell.appendChild(editButton);

          // Bouton de suppression de l'image
          const deleteButton = document.createElement("button");
          deleteButton.classList.add("btn-icon");
          deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
          deleteButton.addEventListener("click", () =>
            deleteImage(habitat.id, image.id, index)
          );
          imagesHabitatCell.appendChild(deleteButton);
        });
      } else {
        imagesHabitatCell.textContent = "Aucune image";
      }
      row.appendChild(imagesHabitatCell);

      // Colonne Actions
      const actionsCell = document.createElement("td");

      // Bouton Modifier
      const editButton = document.createElement("button");
      editButton.classList.add("btn-icon");
      editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
      editButton.addEventListener("click", () => editHabitat(habitat.id));
      actionsCell.appendChild(editButton);

      // Bouton Supprimer
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn-icon");
      deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
      deleteButton.addEventListener("click", () => deleteAnimal(animal.id));
      actionsCell.appendChild(deleteButton);

      row.appendChild(actionsCell);

      // Ajout de la ligne au tableau
      habitatList.appendChild(row);
    });
  } else {
    // Si aucun habitat trouvé
    const row = document.createElement("tr");
    const noHabitatCell = document.createElement("td");
    noHabitatCell.textContent = "Aucun habitat trouvé.";
    noHabitatCell.colSpan = 5; // Fusionner les colonnes pour le message
    row.appendChild(noHabitatCell);
    habitatList.appendChild(row);
  }
}

// Fonction pour modifier un animal
async function editHabitat(habitatId) {
  const newHabitatName = prompt(
    "Entrez le nouveau nom pour cet Habitat (laissez vide pour ne pas modifier) :"
  );
  const newHabitatDescription = prompt(
    "Entrez la nouvelle description pour cet habitat (laissez vide pour ne pas modifier) :"
  );
  const newHabitatCommentaire = prompt(
    "Entrez le nouveau commentaire pour cette habitat (laissez vide pour ne pas modifier) :"
  );

  if (!newHabitatName && !newHabitatDescription && !newHabitatCommentaire) {
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
    if (newHabitatName) body.nom = newHabitatName;
    if (newHabitatDescription) body.description = newHabitatDescription;
    if (newHabitatCommentaire) body.commentaire_habitat = newHabitatCommentaire;

    // Configuration des options pour la requête HTTP
    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(body),
    };

    // Requête API pour modifier l'animal
    const response = await fetch(
      `${apiUrl}/habitat/edit/${habitatId}`,
      requestOptions
    );

    if (response.ok) {
      alert("Les modifications ont été effectuées avec succès !");
      fetchHabitats(); // Recharge la liste des animaux
    } else {
      const errorMessage = await response.text();
      alert(`Erreur lors de la mise à jour : ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue lors de la modification.");
  }
}

// Fonction pour supprimer un habitat
async function deleteHabitat(habitatId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet habitat ?")) return;

  try {
    // Création des en-têtes avec le token d'authentification
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    // Requête API pour supprimer l'animal
    const response = await fetch(`${apiUrl}/habitat/delete/${habitatId}`, {
      method: "DELETE",
      headers: myHeaders,
    });

    if (response.ok) {
      alert("Habitat supprimé avec succès !");
      fetchHabitats(); // Recharge la liste des animaux
    } else {
      const errorMessage = await response.text();
      alert(`Erreur lors de la suppression : ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue lors de la suppression.");
  }
}

// // Appel initial pour charger les animaux au chargement de la page
document.addEventListener("DOMContentLoaded", fetchHabitats);
