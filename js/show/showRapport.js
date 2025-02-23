document.addEventListener("DOMContentLoaded", () => {
  console.log("🌍 DOM chargé, attente avant exécution de fetchRapport()...");

  setTimeout(() => {
    console.log("⏳ Lancement de fetchRapport après délai...");
    fetchRapport();
  }, 500); // Attente de 500ms avant d'exécuter la fonction

  // Vérifiez si les éléments existent avant d'ajouter des écouteurs
  const sortAnimalBtn = document.querySelector("#sortAnimal");
  const sortDateBtn = document.querySelector("#sortDate");

  if (sortAnimalBtn) {
    console.log("Élément sortAnimal trouvé, ajout de l'écouteur d'événement.");
    sortAnimalBtn.addEventListener("click", () => {
      alert("Tri par prénom de l'animal cliqué !");
      sortTable(1);
    });
  } else {
    console.error("Élément sortAnimal non trouvé.");
  }

  if (sortDateBtn) {
    console.log("Élément sortDate trouvé, ajout de l'écouteur d'événement.");
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

//Fonction pour modifier les rapport vétérinaire
async function editRapport(rapportId) {
  const newAnimalDetail = prompt("Entrez le nouveau rapport pour cet animal");

  if (!newAnimalDetail) {
    alert("Aucune modification à effectuer");
    return;
  }
  try {
    //Création de l'en-tête de la requête
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    //Préparation du corps de la requête
    const body = {};
    if (newAnimalDetail) body.detail = newAnimalDetail;

    //Configuration des options de la requête
    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringyfy(nody),
    };

    //Requête API pour modification
    const response = await fetch(
      `${apiUrl}/rapport/edit/${rapportId}`,
      requestOptions
    );

    if (!response.ok) {
      alert("Les modifications ont été effectuées avec succès!");
      fetchRapport();
    } else {
      const errorMessage = await response.text();
      alert(`Erreur lors de la mise à jour : ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue lors de la modification");
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
