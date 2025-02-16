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
            <p class="text-service">${service.price}€</p>
            <div class="service-icons">
                <i class="fas fa-edit edit-icon" title="Modifier" data-id="${service.id}"></i>
                <i class="fas fa-trash delete-icon" title="Supprimer" data-id="${service.id}"></i>
               
            </div>
        `;
    container.appendChild(card);
  });
  // Attache les événements après la création des éléments
  document.querySelectorAll(".edit-icon").forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const serviceId = event.target.getAttribute("data-id");
      modifierService(serviceId);
    });
  });

  document.querySelectorAll(".delete-icon").forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const serviceId = event.target.getAttribute("data-id");
      supprimerService(serviceId);
    });
  });
}

document.addEventListener("DOMContentLoaded", recupServices);

//Fonction pour ajouter un service

document.addEventListener("DOMContentLoaded", function () {
  const formService = document.getElementById("service-form");

  //On vérifie si le formulaire existe bien dans le DOM
  if (!formService) {
    console.log("Formulaire introuvable au chargement du DOM. Attente...");
    setTimeout(() => {
      const formServiceAfterDelay = document.getElementById("service-form");
      if (formServiceAfterDelay) {
        console.log("Formulaire trouvé après délai !");
        initializeForm(formServiceAfterDelay);
      } else {
        console.error("Le formulaire service n'a toujours pas été trouvé.");
      }
    }, 1000);
  } else {
    console.log("Formulaire service trouvé !");
    initializeForm(formService);
  }
});

function initializeForm(formService) {
  formService.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des valeurs du formulaire
    const titre = document.getElementById("nomService").value.trim();
    const description = document
      .getElementById("descriptionService")
      .value.trim();
    const prix = document.getElementById("prix").value;
    const messageElement = document.getElementById("message-service");

    // Vérification des champs
    if (!titre || !description || isNaN(prix) || prix === "") {
      messageElement.textContent =
        "Veuillez remplir tous les champs correctement";
      messageElement.style.color = "red";
      return;
    }

    console.log("Données envoyées:", { titre, description, prix });

    try {
      // Initialisation des headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-AUTH-TOKEN", getToken());

      // Création du body de la requête
      let raw = JSON.stringify({
        name: titre,
        description: description,
        price: parseFloat(prix), // Convertir en nombre
      });

      // Définition des options de la requête
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      // Envoi de la requête à l'API
      const response = await fetch(`${apiUrl}/service/new`, requestOptions);

      if (!response.ok) {
        throw new Error(
          `Erreur lors de l'envoi du formulaire de service: ${response.status}`
        );
      }

      messageElement.textContent = "Service ajouté avec succès";
      messageElement.style.color = "green";

      // Réinitialisation du formulaire après ajout
      formService.reset();
    } catch (error) {
      console.error("Erreur: ", error);
      messageElement.textContent = "Impossible d'ajouter le service";
      messageElement.style.color = "red";
    }
  });
}

//Fonction pour modifier un service
async function modifierService(serviceId) {
  const newServiceName = prompt(
    "Entrez le nouveau nom pour ce service (laissez vide pour ne pas modifier) :"
  );
  const newServiceDescription = prompt(
    "Entrez la nouvelle description pour ce service (laissez vide pour ne pas modifier) :"
  );
  const newServicePrice = prompt(
    "Entrez le nouveau prix pour ce service (laissez vide pour ne pas modifier) :"
  );

  if (!newServiceName && !newServiceDescription && !newServicePrice) {
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
    if (newServiceName) body.name = newServiceName;
    if (newServiceDescription) body.description = newServiceDescription;
    if (newServicePrice && !isNaN(newServicePrice)) {
      body.price = parseFloat(newServicePrice);
    }

    // Configuration des options pour la requête HTTP
    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(body),
    };

    // Requête API pour modifier le service
    const response = await fetch(
      `${apiUrl}/service/edit/${serviceId}`,
      requestOptions
    );

    if (response.ok) {
      alert("Les modifications ont été effectuées avec succès !");
      recupServices(); // Recharge la liste des services
    } else {
      const errorMessage = await response.text();
      alert(`Erreur lors de la mise à jour : ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue lors de la modification.");
  }
}

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
