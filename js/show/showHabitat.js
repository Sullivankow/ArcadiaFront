// Fonction pour récupérer les habitats
async function fetchHabitats() {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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
  }
}

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

      // Gestion de l'image avec vérification
      const imageElement = document.createElement("img");
      imageElement.src = habitat.images?.[0]?.imageUrl
        ? `http://localhost:8081${habitat.images[0].imageUrl}`
        : "http://localhost:8081/uploads/default.jpg";
      imageElement.alt = `Image de ${habitat.nom}`;
      card.appendChild(imageElement);

      const title = document.createElement("h3");
      title.textContent = habitat.nom || "Sans nom";
      card.appendChild(title);

      // Détails cachés par défaut
      const details = document.createElement("div");
      details.classList.add("card-details");
      details.innerHTML = `
              <p>${habitat.description || "Aucune description disponible"}</p>
              <p>Commentaire : ${habitat.commentaire_habitat || "Aucun"}</p>
          `;
      card.appendChild(details);

      // Ajouter un événement pour afficher/masquer les détails
      card.addEventListener("click", () => {
        details.style.display =
          details.style.display === "block" ? "none" : "block";
      });

      // Conteneur des boutons
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("card-buttons");

      const editButton = document.createElement("button");
      editButton.classList.add("buttonEditHabitat");
      editButton.textContent = "Modifier";
      editButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Empêcher le clic de passer au card
        editHabitat(habitat.id);
      });
      buttonContainer.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("buttonDeleteHabitat");
      deleteButton.textContent = "Supprimer";
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Empêcher le clic de passer au card
        deleteHabitat(habitat.id);
      });
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

// Charger les habitats au chargement de la page
document.addEventListener("DOMContentLoaded", fetchHabitats);

//Fonction pour ajouter un habitat

document.addEventListener("DOMContentLoaded", function () {
  const formHabitat = document.getElementById("habitat-form");

  //On vérifie si le formulaire existe bien dans le DOM
  if (!formHabitat) {
    console.log(
      "Formulaire habitat introuvable au chargement du DOM. Attente..."
    );
    setTimeout(() => {
      const formHabitatAfterDelay = document.getElementById("habitat-form");
      if (formHabitatAfterDelay) {
        console.log("Formulaire habitat trouvé après délai !");
        initializeForm(formHabitatAfterDelay);
      } else {
        console.error("Le formulaire horaire n'a toujours pas été trouvé.");
      }
    }, 1000);
  } else {
    console.log("Formulaire habitat trouvé !");
    initializeForm(formHabitat);
  }
});

function initializeForm(formHabitat) {
  formHabitat.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des valeurs du formulaire
    const nomHabitat = document.getElementById("name-habitat").value.trim();
    const imageHabitat = document.getElementById("image-pets").value.trim();
    const commentaireHabitat = document
      .getElementById("commentaireHabitat")
      .value.trim();
    const descriptionHabitat = document
      .getElementById("description-habitat")
      .value.trim();

    const messageElement = document.getElementById("message-habitat");

    // Vérification des champs
    if (
      !nomHabitat ||
      !imageHabitat ||
      !descriptionHabitat ||
      !commentaireHabitat
    ) {
      messageElement.textContent =
        "Veuillez remplir tous les champs correctement";
      messageElement.style.color = "red";
      return;
    }

    console.log("Données envoyées:", {
      nomHabitat,
      imageHabitat,
      descriptionHabitat,
      commentaireHabitat,
    });

    try {
      // Initialisation des headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-AUTH-TOKEN", getToken());

      // Création du body de la requête
      let raw = JSON.stringify({
        nom: nomHabitat,
        description: descriptionHabitat,
        commentaire_habitat: commentaireHabitat,
        image_path: imageHabitat,
      });

      // Définition des options de la requête
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      // Envoi de la requête à l'API
      const response = await fetch(`${apiUrl}/habitat/new`, requestOptions);

      if (!response.ok) {
        throw new Error(
          `Erreur lors de l'envoi du formulaire habitat: ${response.status}`
        );
      }

      messageElement.textContent = "Habitat ajouté avec succès";
      messageElement.style.color = "green";

      // Réinitialisation du formulaire après ajout
      formHabitat.reset();
    } catch (error) {
      console.error("Erreur: ", error);
      messageElement.textContent = "Impossible d'ajouter le service";
      messageElement.style.color = "red";
    }
  });
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
