// Fonction pour récupérer les animaux depuis l'API
async function fetchAnimals() {
  try {
    // Création des en-têtes avec le token d'authentification
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken()); // Assurez-vous que getToken() retourne un token valide

    // Configuration des options pour la requête HTTP
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // Requête API pour récupérer les animaux
    const response = await fetch(`${apiUrl}/animal/list`, requestOptions);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des animaux : ${response.status}`
      );
    }

    // Conversion de la réponse en JSON
    const animals = await response.json();
    console.log("Animaux récupérés :", animals);

    // Appel de la fonction pour afficher les animaux
    displayAnimals(animals);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des animaux :",
      error.message
    );
    console.log("Une erreur est survenue lors de la récupération des animaux.");
  }
}

// Fonction pour afficher les animaux dans le tableau HTML
function displayAnimals(animals) {
  const animalList = document.getElementById("animal-list");
  if (!animalList) {
    console.error(
      "Erreur : L'élément avec l'ID 'animal-list' n'existe pas dans le DOM."
    );
    return;
  }

  animalList.innerHTML = ""; // Vide le tableau avant d'ajouter de nouveaux éléments

  if (Array.isArray(animals) && animals.length > 0) {
    animals.forEach((animal) => {
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

      //Colonne Habitat
      const habitatCell = document.createElement("td");
      habitatCell.textContent = animal.habitat || "Sans nom";
      row.appendChild(habitatCell);

      //Colonne Race
      const raceCell = document.createElement("td");
      raceCell.textContent = animal.race || "Sans nom";
      row.appendChild(raceCell);

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
  const newAnimalName = prompt(
    "Entrez le nouveau nom pour cet animal (laissez vide pour ne pas modifier) :"
  );
  const newStateAnimal = prompt(
    "Entrez le nouvel état pour cet animal (laissez vide pour ne pas modifier) :"
  );

  const newHabitatAnimal = prompt(
    "Entrez le nouvel habitat pour cet animal (laissez vide pour ne pas modifier) :"
  );

  const newRaceAnimal = prompt(
    "Entrez la nouvelle race pour cet animal (laissez vide pour ne pas modifier) :"
  );

  if (
    !newAnimalName &&
    !newStateAnimal &&
    !newHabitatAnimal &&
    !newRaceAnimal
  ) {
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
    if (newStateAnimal) body.habitat = newHabitatAnimal;
    if (newStateAnimal) body.race = newRaceAnimal;

    // Configuration des options pour la requête HTTP
    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(body),
    };

    // Requête API pour modifier l'animal
    const response = await fetch(
      `${apiUrl}/animal/edit/${animalId}`,
      requestOptions
    );

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
      method: "DELETE",
      headers: myHeaders,
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

// Fonction pour ajouter un animal
document.addEventListener("DOMContentLoaded", function () {
  const formAnimal = document.getElementById("animal-form");

  // Vérification si le formulaire est déjà dans le DOM au moment du chargement
  if (!formAnimal) {
    console.log(
      "Formulaire introuvable au chargement du DOM. Attente de l'injection..."
    );
    // On peut essayer d'attendre un peu avant de vérifier à nouveau
    setTimeout(() => {
      // Essaye de retrouver le formulaire après un délai
      const formAnimalAfterDelay = document.getElementById("animal-form");
      if (formAnimalAfterDelay) {
        console.log("Formulaire trouvé après délai !");
        initializeForm(formAnimalAfterDelay); // Appelle la fonction d'initialisation du formulaire
      } else {
        console.error(
          "Le formulaire n'a toujours pas été trouvé après l'injection."
        );
      }
    }, 1000); // Attends 1 seconde pour voir si l'injection du formulaire est terminée
  } else {
    console.log("Formulaire trouvé au moment du chargement du DOM.");
    initializeForm(formAnimal); // Appelle la fonction d'initialisation du formulaire
  }

  // Fonction d'initialisation du formulaire
  function initializeForm(form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      console.log("Formulaire soumis");

      // Récupérer les valeurs du formulaire
      const nomAnimal = document.getElementById("nameAnimal").value.trim();
      const raceAnimal = document.getElementById("raceAnimal").value;
      const etatAnimal = document.getElementById("etatAnimal").value.trim();
      const habitatAnimal = document.getElementById("habitatAnimal").value;

      const messageElement = document.getElementById("message");

      // Vérification de la validité des champs
      if (!nomAnimal || !raceAnimal || !habitatAnimal || !etatAnimal) {
        messageElement.textContent = "Veuillez saisir tous les champs";
        messageElement.style.color = "red";
        return;
      }
      console.log("Données envoyées:", {
        nomAnimal,
        etatAnimal,
        habitatAnimal,
        raceAnimal,
      });

      try {
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken());
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
          prenom: nomAnimal,
          etat: etatAnimal,
          habitat: habitatAnimal,
          race: raceAnimal,
        });

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

        const response = await fetch(`${apiUrl}/animal/new`, requestOptions);
        if (!response.ok) {
          throw new Error(
            `Erreur lors de l'envoi du formulaire: ${response.status}`
          );
        }

        messageElement.textContent = "Animal ajouté avec succès";
        messageElement.style.color = "green";
      } catch (error) {
        console.error("Erreur :", error);
        messageElement.textContent = "Impossible d'ajouter l'animal";
        messageElement.style.color = "red";
      }
    });
  }
});

// Fonction pour récupérer et afficher les races dans le select
async function chargerRaces() {
  try {
    // Vérification de l'existence de l'élément dans le DOM
    const selectRace = document.querySelector(".racesAnimals");
    console.log("Recherche de l'élément .racesAnimals :", selectRace);
    if (!selectRace) {
      console.error("Élément race introuvable dans le DOM");
      return;
    }

    // Vérification de apiUrl et getToken
    console.log("URL de l'API :", apiUrl);
    console.log("Token utilisé :", getToken());

    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(`${apiUrl}/race/list`, requestOptions);

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Authentification échouée. Token invalide ou expiré.");
      } else {
        console.error(
          "Erreur lors de la récupération des races",
          response.status
        );
      }
      return;
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("Aucune race trouvée dans l'API.");
      return;
    }

    selectRace.innerHTML = `<option value="">Sélectionnez une race</option>`;
    data.forEach((race) => {
      if (race.label) {
        let option = document.createElement("option");
        option.value = race.label;
        option.textContent = race.label;
        selectRace.appendChild(option);
      } else {
        console.error("Données invalides détectées :", race);
      }
    });

    console.log("Races chargées avec succès !");
  } catch (error) {
    console.error("Erreur :", error);
  }
}

// Fonction pour récupérer et afficher les habitats dans le select du formulaire
async function chargerHabitat() {
  try {
    const selectHabitat = document.getElementById("habitatAnimal");
    console.log("Recherche de l'élément #habitatAnimal :", selectHabitat);
    if (!selectHabitat) {
      console.error("Élément habitat introuvable dans le DOM");
      return;
    }

    console.log("URL de l'API :", apiUrl);
    console.log("Token utilisé :", getToken());

    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(`${apiUrl}/habitat/show`, requestOptions);

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Authentification échouée. Token invalide ou expiré.");
      } else {
        console.error(
          "Erreur lors de la récupération des habitats",
          response.status
        );
      }
      return;
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("Aucun habitat trouvé dans l'API.");
      return;
    }

    selectHabitat.innerHTML = `<option value="">Sélectionnez un habitat</option>`;
    data.forEach((habitat) => {
      if (habitat.nom) {
        let option = document.createElement("option");
        option.value = habitat.nom;
        option.textContent = habitat.nom;
        selectHabitat.appendChild(option);
      } else {
        console.error("Données invalides détectées :", habitat);
      }
    });

    console.log("Habitats chargés avec succès !");
  } catch (error) {
    console.error("Erreur :", error);
  }
}

// Exécuter les fonctions après le chargement complet de la page
setTimeout(() => {
  //Cette fonction retarde le chargement de la page
  console.log("Exécution retardée de 2 secondes");
  chargerRaces();
  chargerHabitat();
}, 2000);

/////////////////////////

async function fetchAnimaux() {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(`${apiUrl}/animal/list`, requestOptions);
    if (!response.ok) throw new Error(`Erreur : ${response.status}`);

    const animals = await response.json();
    displayAnimalCards(animals);
  } catch (error) {
    console.error("Erreur API :", error.message);
  }
}

function displayAnimalCards(animals) {
  const container = document.getElementById("animal-cards-container");
  container.innerHTML = "";

  animals.forEach((animal) => {
    const card = document.createElement("div");
    card.classList.add("animal-card");
    card.innerHTML = `
     
          <h3>${animal.prenom}</h3>
          <div class="animal-details" style="display: none;">
              <p><strong>État :</strong> ${animal.etat}</p>
              <p><strong>Habitat :</strong> ${animal.habitat}</p>
              <p><strong>Race :</strong> ${animal.race}</p>
          </div>
      `;
    card.addEventListener("click", () => {
      const details = card.querySelector(".animal-details");
      details.style.display =
        details.style.display === "block" ? "none" : "block";
    });
    container.appendChild(card);
  });
}

function scrollLeft() {
  document
    .getElementById("animal-cards-container")
    .scrollBy({ left: -300, behavior: "smooth" });
}

function scrollRight() {
  document
    .getElementById("animal-cards-container")
    .scrollBy({ left: 300, behavior: "smooth" });
}

// Ajouter les événements
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".carousel-btn.left")
    .addEventListener("click", scrollLeft);
  document
    .querySelector(".carousel-btn.right")
    .addEventListener("click", scrollRight);
});

// Appel de la fonction pour récupérer les animaux
fetchAnimaux();
