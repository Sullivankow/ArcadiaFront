// Fonction pour récupérer les habitats depuis l'API
async function fetchHabitats() {
  try {
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken()); // Remplace getToken() par la fonction qui récupère ton token

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(`${apiUrl}/habitat/show`, requestOptions);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des habitats : ${response.status}`
      );
    }

    const habitats = await response.json();
    console.log("Habitats récupérés :", habitats);
    displayHabitats(habitats);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des habitats :",
      error.message
    );
    alert("Une erreur est survenue lors de la récupération des habitats.");
  }
}

// Fonction pour afficher les habitats sous forme de cartes
function displayHabitats(habitats) {
  const habitatContainer = document.getElementById("habitat-cards");
  if (!habitatContainer) {
    console.error(
      "Erreur : L'élément avec l'ID 'habitat-cards' n'existe pas dans le DOM."
    );
    return;
  }

  habitatContainer.innerHTML = ""; // Vider le contenu existant

  if (Array.isArray(habitats) && habitats.length > 0) {
    habitats.forEach((habitat) => {
      const card = document.createElement("div");
      card.classList.add("habitat-card");

      const imageElement = document.createElement("img");
      imageElement.src =
        (habitat.images &&
          Array.isArray(habitat.images) &&
          habitat.images[0]?.image_Path) ||
        "default.jpg";
      imageElement.alt = `Image de ${habitat.nom}`;
      card.appendChild(imageElement);

      const title = document.createElement("h3");
      title.textContent = habitat.nom || "Sans nom";
      card.appendChild(title);

      const description = document.createElement("p");
      description.textContent =
        habitat.description || "Aucune description disponible";
      card.appendChild(description);

      const commentaire = document.createElement("p");
      commentaire.textContent = `Commentaire : ${
        habitat.commentaire_habitat || "Aucun"
      }`;
      card.appendChild(commentaire);

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("card-buttons");

      // Optionnel : Vous pouvez ajouter des boutons de modification et de suppression ici
      const editButton = document.createElement("button");
      editButton.textContent = "Modifier";
      editButton.addEventListener("click", () => editHabitat(habitat.id)); // Remplacez editHabitat par la fonction de modification
      buttonContainer.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.addEventListener("click", () => deleteHabitat(habitat.id)); // Remplacez deleteHabitat par la fonction de suppression
      buttonContainer.appendChild(deleteButton);

      card.appendChild(buttonContainer);
      habitatContainer.appendChild(card);
    });
  } else {
    const message = document.createElement("p");
    message.textContent = "Aucun habitat trouvé.";
    habitatContainer.appendChild(message);
  }
}
// Fonction pour modifier un habitat
async function editHabitat(habitatId) {
  const newHabitatName = prompt("Entrez le nouveau nom pour cet Habitat :");
  const newHabitatDescription = prompt("Entrez la nouvelle description :");
  const newHabitatCommentaire = prompt("Entrez le nouveau commentaire :");

  if (!newHabitatName && !newHabitatDescription && !newHabitatCommentaire) {
    alert("Aucune modification à effectuer.");
    return;
  }

  try {
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    const body = {};
    if (newHabitatName) body.nom = newHabitatName;
    if (newHabitatDescription) body.description = newHabitatDescription;
    if (newHabitatCommentaire) body.commentaire_habitat = newHabitatCommentaire;

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(body),
    };

    const response = await fetch(
      `${apiUrl}/habitat/edit/${habitatId}`,
      requestOptions
    );
    if (response.ok) {
      alert("Les modifications ont été effectuées avec succès !");
      fetchHabitats();
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
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    const response = await fetch(`${apiUrl}/habitat/delete/${habitatId}`, {
      method: "DELETE",
      headers: myHeaders,
    });

    if (response.ok) {
      alert("Habitat supprimé avec succès !");
      fetchHabitats();
    } else {
      const errorMessage = await response.text();
      alert(`Erreur lors de la suppression : ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue lors de la suppression.");
  }
}

// Charger les habitats au chargement de la page
document.addEventListener("DOMContentLoaded", fetchHabitats);
