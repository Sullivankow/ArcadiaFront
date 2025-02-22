//Fonction pour récupérér les rapports vétérinaire depuis l'API
async function fetchRapport() {
  try {
    //Création des en-tête avec le token d'authentification
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    //Configuration des options de la requête
    let requestOptions = {
      method: "GET",
      hearder: myHeaders,
      redirect: "follow",
    };

    //Requête API pour récupérer les rapport vétérinaire
    const response = await fetch(`${apiUrl}/rapport/show`, requestOptions);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des rapports vétérinaire: ${response.status}`
      );
    }

    //Conversion de la réponse en JSON
    const rapport = await response.json();
    console.log("Rapports récupérés:", rapport);

    //Appel de la fonction pour afficher les animaux
    displayRapport(rapport);
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récupération des rapports vétérinaire"
    );
  }
}

//Fonction pour afficher les rapports vétérinaire dans le tableau
function displayRapport(rapport) {
  const rapportList = document.gerElementById("tableauVet");
  if (!rapportList) {
    console.error(
      "Erreur: l'élément avec l'id 'tableauVet' n'existe pas dans le DOM "
    );
    return;
    }
    
    rapportList.innerHTML = ""; //Vide le tableau avant d'ajouter de nouveaux éléments
}
