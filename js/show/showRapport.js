document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    fetchRapport();
  }, 500); // Attente de 500ms avant d'exécuter la fonction

  // Vérifiez si les éléments existent avant d'ajouter des écouteurs
  const sortAnimalBtn = document.querySelector("#sortAnimal");
  const sortDateBtn = document.querySelector("#sortDate");

  if (sortAnimalBtn) {
    sortAnimalBtn.addEventListener("click", () => {
      alert("Tri par prénom de l'animal cliqué !");
      sortTable(1);
    });
  } else {
    console.error("Élément sortAnimal non trouvé.");
  }

  if (sortDateBtn) {
    sortDateBtn.addEventListener("click", () => {
      alert("Tri par date cliqué !");
      sortTable(4);
    });
  } else {
    console.error("Élément sortDate non trouvé.");
  }
});

// Fonction pour récupérer les rapports vétérinaires depuis l'API
async function fetchRapport() {
  try {
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(`${apiUrl}/rapport/show`, requestOptions);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des rapports vétérinaires: ${response.status}`
      );
    }

    const rapports = await response.json();
    console.log("📄 Rapports récupérés:", rapports);

    displayRapport(rapports);
  } catch (error) {
    console.error("❌ Erreur récupération rapports vétérinaires:", error);
  }
}

// Fonction pour afficher les rapports vétérinaires dans le tableau
function displayRapport(rapports) {
  const rapportList = document.getElementById("tableauVet");
  if (!rapportList) {
    console.error("❌ Erreur: Élément 'tableauVet' non trouvé dans le DOM.");
    return;
  }

  rapportList.innerHTML = ""; // Vide le tableau avant d'ajouter de nouveaux éléments

  if (Array.isArray(rapports) && rapports.length > 0) {
    rapports.forEach((rapport) => {
      const row = document.createElement("tr");

      // Ajouter les cellules pour chaque colonne
      const idRapportCell = document.createElement("td");
      idRapportCell.textContent = rapport.id || "N/A";

      row.appendChild(idRapportCell);

      const prenomAnimalCell = document.createElement("td");
      prenomAnimalCell.textContent = rapport.animalName || "N/A";

      row.appendChild(prenomAnimalCell);

      const detailRapportCell = document.createElement("td");
      detailRapportCell.textContent = rapport.detail || "N/A";

      row.appendChild(detailRapportCell);

      const userNameRapportCell = document.createElement("td");
      userNameRapportCell.textContent = rapport.userEmail || "N/A";

      row.appendChild(userNameRapportCell);

      const dateRapportCell = document.createElement("td");
      dateRapportCell.textContent = rapport.date || "N/A";

      row.appendChild(dateRapportCell);

      // Colonne Actions
      const actionCell = document.createElement("td");

      const editButton = document.createElement("button");
      editButton.classList.add("btn-icon-rapport");
      editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
      editButton.addEventListener("click", () => editRapport(rapport.id));
      actionCell.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn-icon-rapport");
      deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
      deleteButton.addEventListener("click", () => deleteRapport(rapport.id));
      actionCell.appendChild(deleteButton);

      row.appendChild(actionCell);
      rapportList.appendChild(row);
    });
  } else {
    const row = document.createElement("tr");
    const noRapportCell = document.createElement("td");
    noRapportCell.textContent = "Aucun rapport trouvé";
    noRapportCell.colSpan = 6;
    row.appendChild(noRapportCell);
    rapportList.appendChild(row);
  }

  // Appeler sortTable après avoir affiché les données
  sortTable(4); // Trier par date par défaut
}

//Fonction pour modifier les rapports vétérnaire
async function editRapport(rapportId) {
  const newPrenomAnimal = prompt("Entrez le nouveau prénom de l'animal");
  const newAnimalDetail = prompt("Entrez le nouveau rapport pour cet animal");
  const newUserEmail = prompt("Entrez votre email d'utilisateur");
  const newDate = prompt("Entrez la date de votre rapport (format DD-MM-YYYY)");

  // Vérifier si au moins un champ a été modifié
  if (!newPrenomAnimal && !newAnimalDetail && !newUserEmail && !newDate) {
    alert("Aucune modification à effectuer");
    return;
  }

  try {
    // Création de l'en-tête de la requête
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    // Préparation du corps de la requête
    const body = {};
    if (newPrenomAnimal) body.animal_prenom = newPrenomAnimal;
    if (newAnimalDetail) body.detail = newAnimalDetail;
    if (newUserEmail) body.user_email = newUserEmail;
    if (newDate) body.date = newDate;

    console.log("Corps de la requête :", JSON.stringify(body));

    // Configuration des options de la requête
    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(body),
    };

    // Requête API pour modification
    const response = await fetch(
      `${apiUrl}/rapport/edit/${rapportId}`,
      requestOptions
    );
    if (response.ok) {
      alert("Les modifications ont été effectuées avec succès !");
      fetchRapport();
    } else {
      const errorMessage = await response.text();
      alert(`Erreur lors de la mise à jour : ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue lors de la modification.");
  }
}
//Fonction pour supprimer un rapport vétérinaire
async function deleteRapport(rapportId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce rapport?")) return;

  try {
    //Création de l'en-tête de la requête
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    //Requête API pour supprimer un rapport vétérinaire

    const response = await fetch(`${apiUrl}/rapport/delete/${rapportId}`, {
      method: "DELETE",
      headers: myHeaders,
    });

    if (response.ok) {
      alert("Rapport supprimé avec succès!");
      fetchRapport();
    } else {
      const errorMessage = await response.text();
      alert(`Erreur lors de la suppression : ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erreur: ", error);
    alert("Une erreur est survenue lors de la suppression.");
  }
}

// Fonction de tri
function sortTable(columnIndex) {
  const table = document.getElementById("tableauCompteRendu");
  if (!table) {
    console.error("❌ Erreur: Tableau non trouvé.");
    return;
  }

  const tbody = table.getElementsByTagName("tbody")[0];
  if (!tbody) {
    console.error("❌ Erreur: tbody non trouvé.");
    return;
  }

  const rows = Array.from(tbody.getElementsByTagName("tr"));
  if (rows.length === 0) {
    console.error("❌ Erreur: Aucune ligne à trier.");
    return;
  }

  // Déterminer l'ordre de tri (ascendant ou descendant)
  let isAscending = table.getAttribute("data-sort-order") === "asc";
  table.setAttribute("data-sort-order", isAscending ? "desc" : "asc");

  // Trier les lignes en fonction de la colonne
  rows.sort((rowA, rowB) => {
    const cellA = rowA
      .getElementsByTagName("td")
      [columnIndex]?.textContent.trim();
    const cellB = rowB
      .getElementsByTagName("td")
      [columnIndex]?.textContent.trim();

    if (!cellA || !cellB) {
      return 0; // Ne pas trier si la cellule n'existe pas
    }

    if (columnIndex === 4) {
      // Si la colonne est une date, convertir en objet Date pour le tri
      const dateA = new Date(cellA);
      const dateB = new Date(cellB);
      return isAscending ? dateA - dateB : dateB - dateA;
    } else {
      // Sinon, trier par texte
      return isAscending
        ? cellA.localeCompare(cellB)
        : cellB.localeCompare(cellA);
    }
  });

  // Réorganiser les lignes dans le tableau
  tbody.innerHTML = ""; // Vider le tbody
  rows.forEach((row) => tbody.appendChild(row));
}

// Fonction pour ajouter un rapport vétérinaire
document.addEventListener("DOMContentLoaded", function () {
  // Délai pour attendre que le DOM soit complètement chargé
  setTimeout(function () {
    const formRapport = document.getElementById("rapport-form");

    // Vérification de la présence du formulaire dans le DOM au moment du chargement
    if (!formRapport) {
      return;
    }

    // Fonction d'initialisation du formulaire
    function initializeForm(form) {
      form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupération des valeurs du formulaire
        const prenomAnimal = document
          .getElementById("prenomAnimal")
          .value.trim();
        const rapportAnimal = document
          .getElementById("rapportAnimal")
          .value.trim();
        const userEmail = document.getElementById("user-email").value.trim();
        const dateRapport = document.getElementById("date").value;
        const messageElement = document.getElementById("messageRapport");

        // Vérification des champs requis
        if (!prenomAnimal || !rapportAnimal || !userEmail || !dateRapport) {
          messageElement.textContent = "Veuillez remplir tous les champs";
          messageElement.style.color = "red";
          return;
        }

        try {
          // Vérification que getToken() et apiUrl existent
          if (typeof getToken !== "function") {
            throw new Error("getToken() n'est pas défini");
          }
          if (typeof apiUrl === "undefined") {
            throw new Error("apiUrl n'est pas défini");
          }

          // Création de l'en-tête de la requête avec le token d'authentification
          let myHeaders = new Headers();
          myHeaders.append("X-AUTH-TOKEN", getToken()); // Assurez-vous que getToken() existe
          myHeaders.append("Content-Type", "application/json");

          // Configuration du corps de la requête
          let raw = JSON.stringify({
            date: dateRapport,
            detail: rapportAnimal,
            email: userEmail,
            animal_prenom: prenomAnimal,
          });

          // Configuration des options de la requête
          let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
          };

          // Appel fetch via l'API
          const response = await fetch(`${apiUrl}/rapport/new`, requestOptions);

          // Vérification de la requête
          if (!response.ok) {
            throw new Error(
              `Erreur lors de l'envoi du formulaire: ${response.status}`
            );
          }

          // Message de succès
          messageElement.textContent = "Rapport ajouté avec succès";
          messageElement.style.color = "green";

          // Réinitialisation du formulaire après succès
          form.reset();
        } catch (error) {
          console.error("Erreur:", error);
          messageElement.textContent = "Impossible d'ajouter le rapport";
          messageElement.style.color = "red";
        }
      });
    }

    // Initialisation du formulaire
    initializeForm(formRapport);
  }, 100); // Délai de 100 ms (0.1 seconde)
});
