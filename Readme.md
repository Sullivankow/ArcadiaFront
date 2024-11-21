Application Web du Zoo Arcadia, mode d'emploi pour le déploiement en local 

Description
Cette application web est conçue pour le Zoo Arcadia, situé en Bretagne près de la forêt de Brocéliande. Elle permet aux visiteurs de découvrir les habitats, animaux et services proposés, tout en reflétant les valeurs écologiques du zoo. Les employés, vétérinaires et administrateurs disposent également d’outils pour gérer leurs tâches quotidiennes.

Fonctionnalités principales

Visiteurs
Consulter la présentation du zoo, ses habitats et ses animaux.
Découvrir les services disponibles (ex. restauration, visites guidées).
Soumettre des avis (sous validation par un employé).
Contacter le zoo via un formulaire.

Employés
Valider ou rejeter les avis des visiteurs.
Gérer les services (ajouter, modifier, supprimer).
Suivre l’alimentation des animaux.

Vétérinaires
Saisir des rapports sur les animaux (état de santé, alimentation).
Commenter les habitats et leur état.
Accéder à l’historique alimentaire des animaux.

Administrateurs
Gérer les utilisateurs (employés et vétérinaires).
Administrer les données du zoo : services, habitats, animaux.
Visualiser des statistiques sur la popularité des animaux.



Déployer le frontend en local (La procédure du déploiement du Backend se trouve dans son repository)
1.Cloner le dépôt du frontend pésent sur github : https://github.com/Sullivankow/ArcadiaFront.git

Récupère le projet dans un terminal de commande : 
git clone <URL_DU_DEPOT_FRONTEND> frontend
Installe les dépendances nécessaires avec les commandes:

npm install

ou pour Yarn :
yarn install


2.Configurer l’environnement
Modifie le fichier de configuration pour pointer vers l’API backend dans le fichier script.js. 

cont apiUrl = http://127.0.0.1:8000/api/doc


3.Téléchargez l'extension Vs Code : Php Server par brapifra
Lancer le serveur frontend enn faisant clique droit sur l'index.html puis php serve
ou démarre le serveur de développement :


npm start
ou
yarn start


Par défaut, le frontend sera accessible sur http://localhost:3000.
L’application frontend devrait maintenant fonctionner.

4.Résolution des problèmes courants
Erreur de connexion avec le backend : Vérifie que l’URL configurée dans const apiUrl du fichier script.js pointe bien vers le backend.

Problème de dépendances : Mets à jour Node.js et les modules avec :

npm update