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
                <td>
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
}
document.addEventListener("DOMContentLoaded", fetchHoraires);

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
async function supprimerHoraire(id) {
  if (!confirm("Es-tu sûr de vouloir supprimer cet horaire ?")) return;

  try {
    const response = await fetch(`${apiUrl}/horaires/delete/${id}`, {
      method: "DELETE",
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
