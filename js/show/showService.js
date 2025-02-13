//Fonction pour récupérer les services
async function recupServices() {
  try {
    //Création des en-têtes
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    //Configuration des options de la requêtes
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    //Requête pour récupérer les services
    const response = await fetch(`${apiUrl}/service/show`, requestOptions);
    console.log("Réponse reçue:", response);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des services: ${response.status}`
      );
    }

    //Conversion de la réponse en JSON
    const service = await response.json();
    console.log("Services récupérés: ", service);
    afficherServices(service);
  } catch (error) {
    console.error("Erreur :", error);
  }
}

//Fonction pour afficher les services
function afficherServices(services) {
  const container = document.querySelector(".nosServices");
  if (!container) {
    console.error("Container des services introuvable !");
    return;
  }

  container.innerHTML = ""; // Vide le conteneur avant de le remplir

  services.forEach((service) => {
    const card = document.createElement("div");
    card.classList.add("card-service");
    card.innerHTML = `
            <h2 class="title-service">${service.name}</h2>
            <p class="text-service">${service.description}</p>
            <p class="text-service">${service.price}</p>
            <div class="service-icons">
                <i class="fas fa-edit edit-icon" title="Modifier" onclick="modifierService('${service.id}')"></i>
                <i class="fas fa-trash delete-icon" title="Supprimer" onclick="supprimerService('${service.id}')"></i>
            </div>
        `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", recupServices);
//Fonction pour ajouter un service
// document
//   .getElementById("form-service")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const titre = document.getElementById("titre").value;
//     const description = document.getElementById("description").value;

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ titre, description }),
//       });

//       if (!response.ok) throw new Error("Erreur lors de l'ajout du service");

//       chargerServices(); // Rafraîchit la liste des services
//     } catch (error) {
//       console.error(error);
//     }
//   });

// //Fonction pour modifier un service
// async function modifierService(id) {
//   const nouveauTitre = prompt("Nouveau titre du service :");
//   const nouvelleDescription = prompt("Nouvelle description du service :");

//   if (!nouveauTitre || !nouvelleDescription) return;

//   try {
//     const response = await fetch(`${apiUrl}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         titre: nouveauTitre,
//         description: nouvelleDescription,
//       }),
//     });

//     if (!response.ok) throw new Error("Erreur lors de la modification");

//     chargerServices();
//   } catch (error) {
//     console.error(error);
//   }
// }

// //Fonction pour supprimer
// async function supprimerService(id) {
//   if (!confirm("Voulez-vous vraiment supprimer ce service ?")) return;

//   try {
//     const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

//     if (!response.ok) throw new Error("Erreur lors de la suppression");

//     chargerServices();
//   } catch (error) {
//     console.error(error);
//   }
// }

// //Fonction pour restreindre l'affichage des fonctionnalités pour les visiteurs
// const estAdmin = getRole() === "admin";
// const estEmploye = getRole() === "employe"; // Exemple de vérification du rôle

// if (!estAdmin || !estEmploye) {
//   document
//     .getElementById("service-section")
//     .querySelectorAll(".service-icons")
//     .forEach((icon) => (icon.style.display = "none"));
// }
