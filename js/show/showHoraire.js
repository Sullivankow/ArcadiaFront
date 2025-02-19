// Fonction pour récupérer et afficher les horaires
async function fetchHoraires() {
  try {
    const response = await fetch(`${apiUrl}/horaires/show`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des horaires");

    const horaires = await response.json();
    const tableau = document.getElementById("horaires-table");
    tableau.innerHTML = ""; // On vide le tableau avant de le remplir

    horaires.forEach((horaire) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      
                <td>${horaire.jour}</td>
                <td>${horaire.heureOuverture}</td>
                <td>${horaire.heureFermeture}</td>
                <td>${horaire.saison}</td>
                <td class="horaires-icons">
               
                    <i class="fa-solid fa-pen-to-square edit-icon" data-id="${horaire.id}" title="Modifier"></i>
                    <i class="fa-solid fa-trash delete-icon" data-id="${horaire.id}" title="Supprimer"></i>
               
                    </td>
            `;
      tableau.appendChild(row);
    });

    // Attache les événements après la création des éléments
    document.querySelectorAll(".edit-icon").forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const horaireId = event.target.getAttribute("data-id");
        console.log("ID de l'horaire sélectionné :", horaireId); // Debugging
        modifierHoraire(horaireId); // ✅ Appel de la fonction de modification
      });
    });

    document.querySelectorAll(".delete-icon").forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const horaireId = event.target.getAttribute("data-id");
        supprimerHoraire(horaireId); // Appel de la fonction de suppression
      });
    });
  } catch (error) {
    console.error(error);
  }
  restreindreAffichage();
}
//Fonction pour restreindre l'affichage
function restreindreAffichage() {
  const estAdmin = getRole() === "ROLE_ADMIN";
  const estEmploye = getRole() === "ROLE_EMPLOYE";

  const formAjout = document.getElementById("horairesSection");
  if (formAjout) {
    // Afficher le formulaire seulement si l'utilisateur est admin ou employé
    formAjout.style.display = estAdmin || estEmploye ? "block" : "none";
  }
}

document.addEventListener("DOMContentLoaded", fetchHoraires);

//Fonction pour ajouter un horaire

document.addEventListener("DOMContentLoaded", function () {
  const formHoraire = document.getElementById("horaire-form");
  if (!formHoraire) {
    console.log(
      "Formulaire Horaire introuvable au chargement du DOM. Attente..."
    );
    setTimeout(() => {
      const formHoraireAfterDelay = document.getElementById("horaire-form");
      if (formHoraireAfterDelay) {
        console.log("Formulaire trouvé après délai");
        initializeForm(formHoraireAfterDelay);
      } else {
        console.error("Le formulaire horaire n'a toujours pas été trouvé");
      }
    }, 1000);
  } else {
    console.log("Formulaire horaire trouvé!");
    initializeForm(formHoraire);
  }
});

function initializeForm(formHoraire) {
  formHoraire.addEventListener("submit", async (event) => {
    event.preventDefault();

    const jour = document.getElementById("jour").value.trim();
    const horaireOuverture = document.getElementById("heureOuverture").value;
    const horaireFermeture = document.getElementById("heureFermeture").value;
    const saison = document.getElementById("saison").value;
    const messageElementHoraire = document.getElementById(
      "messageElementHoraire"
    );

    if (!jour || !horaireOuverture || !horaireFermeture || !saison) {
      if (messageElementHoraire) {
        messageElementHoraire.textContent =
          "Veuillez remplir tous les champs correctement";
        messageElementHoraire.style.color = "red";
      }
      return;
    }

    console.log("Données envoyées:", {
      jour,
      horaireOuverture,
      horaireFermeture,
      saison,
    });

    try {
      let myHeaders = new Headers();
      myHeaders.append("X-AUTH-TOKEN", getToken());
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        jour: jour,
        heureOuverture: horaireOuverture,
        heureFermeture: horaireFermeture,
        saison: saison,
      });

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(`${apiUrl}/horaires/new`, requestOptions);
      if (!response.ok) {
        throw new Error(
          `Erreur lors de l'envoi du formulaire horaire: ${response.status}`
        );
      }

      if (messageElementHoraire) {
        messageElementHoraire.textContent = "Horaire ajouté avec succès";
        messageElementHoraire.style.color = "green";
      }

      formHoraire.reset();
    } catch (error) {
      console.error("Erreur:", error);
      if (messageElementHoraire) {
        messageElementHoraire.textContent = "Impossible d'ajouter l'horaire";
        messageElementHoraire.style.color = "red";
      }
    }
  });
}

// Fonction pour modifier un horaire
async function modifierHoraire(horaireId) {
  console.log("ID reçu pour modification:", horaireId); // Debugging

  if (!horaireId) {
    alert("Erreur : ID invalide !");
    return;
  }

  const nouveauJour = prompt("Nouveau jour d'ouverture :");
  const nouvelleHeureOuverture = prompt("Nouvelle heure d'ouverture (HH:mm) :");
  const nouvelleHeureFermeture = prompt(
    "Nouvelle heure de fermeture (HH:mm) :"
  );
  const nouvelleSaison = prompt("Nouvelle saison :");

  if (
    !nouveauJour ||
    !nouvelleHeureOuverture ||
    !nouvelleHeureFermeture ||
    !nouvelleSaison
  ) {
    alert("Modification annulée.");
    return;
  }

  try {
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    const raw = {
      jour: nouveauJour,
      heureOuverture: nouvelleHeureOuverture,
      heureFermeture: nouvelleHeureFermeture,
      saison: nouvelleSaison,
    };

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(raw),
    };

    const response = await fetch(
      `${apiUrl}/horaires/edit/${horaireId}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la modification de l'horaire");
    }

    alert("Horaire modifié avec succès !");
    fetchHoraires(); // Recharger après modification
  } catch (error) {
    console.error(error);
    alert("Une erreur est survenue : " + error.message);
  }
}

// Fonction pour supprimer un horaire
async function supprimerHoraire(horaireId) {
  if (!confirm("Es-tu sûr de vouloir supprimer cet horaire ?")) return;

  try {
    //Création des en-têtes de la requête
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    //Requête API pour supprimer un horaire

    const response = await fetch(`${apiUrl}/horaires/delete/${horaireId}`, {
      method: "DELETE",
      headers: myHeaders,
    });

    if (!response.ok)
      throw new Error("Erreur lors de la suppression de l'horaire");

    fetchHoraires(); // Recharger après suppression
  } catch (error) {
    console.error(error);
  }
}

// Charger les horaires au démarrage
document.addEventListener("DOMContentLoaded", fetchHoraires);
