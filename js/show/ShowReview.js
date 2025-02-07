//On récupère les avis via l'api
async function fetchAvis() {
  try {
    //Création des en-têtes avec le token d'authentification
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken()); //getToken retourne normalement un token valide

    //Configuration des options de la requête HTTP
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    //Requête pour récupérer les avis via l'api
    const response = await fetch(`${apiUrl}/avis/show`, requestOptions);
    console.log("Réponse reçue:", response);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des avis : ${response.status}`
      );
    }

    //Conversion de la response en JSON
    const avis = await response.json();
    console.log("Avis récupérés :", avis);

    //Appel de la fonction pour afficher les avis
    displayAvis(avis);
  } catch (error) {
    console.error("Erreur lors de la récupération des avis :", error.message);
    console.log("Une erreur est survenue lors de la récupération des avis.");
  }
}

//Afficher les avis dans le tableau
function displayAvis(avis) {
  const avisList = document.getElementById("avis-list");
  if (!avisList) {
    console.error(
      "Erreur : L'élément avec l'id 'avis-list' n'existe pas dans le DOM"
    );
    return;
  }
  avisList.innerHTML = ""; //Vide le tableau avant d'ajouter les avis
  if (Array.isArray(avis) && avis.length > 0) {
    avis.forEach((avis) => {
      const row = document.createElement("tr");

      //Colonne ID
      const idAvisCell = document.createElement("td");
      idAvisCell.textContent = avis.id || "N/A";
      row.appendChild(idAvisCell);

      //Colonne Auteur
      const auteurCell = document.createElement("td");
      auteurCell.textContent = avis.auteur || "Sans nom";
      row.appendChild(auteurCell);

      //Colonne Contenu
      const contenuCell = document.createElement("td");
      contenuCell.textContent = avis.contenu || "Sans contenu";
      row.appendChild(contenuCell);

      //Colonne Date
      const dateCell = document.createElement("td");
      dateCell.textContent = avis.date || "Sans date";
      row.appendChild(dateCell);

      //Colonne Validation
      const validationCell = document.createElement("td");
      validationCell.textContent = avis.valide ? "Validé" : "Non validé";
      row.appendChild(validationCell);

      //Colonne Note
      const noteCell = document.createElement("td");
      noteCell.textContent = avis.note || "Aucune note";
      row.appendChild(noteCell);

      //Colonne Action
      const actionCell = document.createElement("td");

      //Bouton Valider
      const validateButton = document.createElement("button");
      validateButton.classList.add("btn-icon");
      validateButton.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
      validateButton.addEventListener("click", () => validateAvis(avis.id));
      actionCell.appendChild(validateButton);

      //Bouton Suprimer
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn-icon");
      deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
      deleteButton.addEventListener("click", () => deleteAvis(avis.id));
      actionCell.appendChild(deleteButton);

      //Ajout de la ligne dans le tableau
      row.appendChild(actionCell);
      avisList.appendChild(row);
    });
  } else {
    //Si aucun avis trouvé
    const row = document.createElement("tr"); // Ajoute la ligne
    const noAvisCell = document.createElement("td");
    noAvisCell.textContent = "Aucun avis trouvé";
    noAvisCell.colSpan = 6; // Fusionne les colonnes pour le message
    row.appendChild(noAvisCell); // Ajoute la cellule à la ligne
    avisList.appendChild(row); // Ajoute la ligne à la liste d'avis
  }
}

//Fonction pour valider un avis
async function validateAvis(avisId) {
  try {
    //On vérifie si le token est bien récupéré
    const token = getToken();
    if (!token) {
      throw new Error("Token d'authentification manquant");
    }
    //Création des en-têtes avec le token d'authentification
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    //Requête pour validedr un avis
    const response = await fetch(`${apiUrl}/avis/validate/${avisId}`, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({ validated: true }),
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Avis validé avec succès:", data);

    // Rafraîchir l'affichage si nécessaire
    alert("Avis validé avec succès !");
    location.reload(); // Ou mets à jour dynamiquement l'affichage
  } catch (error) {
    console.error("Erreur lors de la validation de l'avis", error);
    alert("Impossible de valider l'avis");
  }
}

//Fonction pour supprimer un avis
async function deleteAvis(avisId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet avis?")) return;

  try {
    //Création des en-tête avec le token d'authentification
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    //Requête pour supprimer l'avis
    const response = await fetch(`${apiUrl}/avis/delete/${avisId}`, {
      method: "DELETE",
      headers: myHeaders,
    });

    if (response.ok) {
      alert("Avis supprimé avec succès");
      fetchAvis();
    } else {
      const errorMessage = await response.text();
      alert(`Erreur lors de la suppression : ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue lors de la suppression");
  }
}
document.addEventListener("DOMContentLoaded", fetchAvis);
