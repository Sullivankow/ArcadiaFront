Application Web du Zoo Arcadia

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



 Préparer la partie frontend (Pour le Backend, se référer au Readme du de la partie backend)
Cloner la partie frontend : https://github.com/Sullivankow/ArcadiaFront.git
Cloner le dépôt du frontend dans un dossier.


Dans un terminal de commande entrez : 
git clone <URL_DU_DEPOT_FRONTEND> nom_du_projet_frontend
cd nom_du_projet_frontend 


Installer les dépendances frontend :
Si ton frontend utilise npm ou Yarn, installe les dépendances :


npm install
# ou
yarn install



Configurer l’URL du backend :
Dans les fichiers de configuration du frontend (script.js) , remplace l’URL de l’API (dans apiUrl) par l’adresse locale du backend :
http://127.0.0.1:8000/api/doc

Lancer le serveur frontend :
Télécharge l'extension Php server de brapifra 
Démarre le serveur de développement frontend en faisant clique droit sur l'index.html puis php serve


Le frontend sera accessible sur http://localhost:3000 par défaut.






Tester l’intégration frontend-backend (Le backend doit déjà être installé)

Connexion et rôles :
Connecte-toi avec un compte administrateur depuis le frontend. (Envoyer un message pour l'obtention des informations de connections)
Vérifie que la gestion des rôles (admin, vétérinaire, employé) fonctionne correctement via showAndHideElementsForRoles.


API et CORS :
Assure-toi que les requêtes frontend au backend passent correctement.
Si des erreurs de CORS apparaissent, vérifie que la configuration de nelmio_cors.yaml inclut :

allow_origin: ['http://localhost:3000']
ou
allow_origin: ['*']
ou
allow_origin: ['%env(CORS_ALLOW_ORIGIN)%']


Responsivité :
Teste l’affichage du tableau des horaires pour les petits écrans et assure-toi que tout reste accessible et lisible.
Possibilité de tester directement dans le navigateur en appuyant sur F12
