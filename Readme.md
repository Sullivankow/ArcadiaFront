🌍 Application Web du Zoo Arcadia - Mode d'emploi pour le déploiement en local du frontend 

🐾 Description

Cette application web est conçue pour le Zoo Arcadia, situé en Bretagne, près de la forêt de Brocéliande. Elle offre aux visiteurs une expérience immersive pour découvrir les habitats, les animaux et les services proposés, tout en mettant en avant les valeurs écologiques du zoo.
Les fonctionnalités incluent également des outils de gestion pour les employés, vétérinaires, et administrateurs, leur permettant de gérer efficacement leurs tâches quotidiennes.

✨ Fonctionnalités principales

Pour les visiteurs :
Explorer les habitats, animaux, et services du zoo.
Soumettre des avis (validés par les employés).
Contacter le zoo via un formulaire.

Pour les employés :
Valider ou rejeter les avis des visiteurs.
Gérer les services (ajouter, modifier, supprimer).
Suivre l'alimentation des animaux.

Pour les vétérinaires :
Rédiger des rapports de santé pour les animaux.
Commenter l'état des habitats.
Consulter l'historique alimentaire des animaux.

Pour les administrateurs :
Gérer les utilisateurs (employés et vétérinaires).
Administrer les données du zoo : services, habitats, et animaux.
Visualiser des statistiques sur la popularité des animaux.


🚀 Déployer le frontend en local
Prérequis
Node.js et npm ou Yarn.
Une extension de serveur local pour exécuter des fichiers HTML (exemple : PHP Server de brapifra pour Visual Studio Code).

1 : Cloner le dépôt
Clonez le dépôt du frontend depuis GitHub :

git clone https://github.com/Sullivankow/ArcadiaFront.git
cd frontend

2 : Installer les dépendances
Installez les dépendances nécessaires :

Dans un terminal de commande entrez : 
npm install
ou si vous utilisez Yarn :
yarn install

3 : Configurer l’environnement
Modifiez le fichier de configuration pour pointer vers l’API backend dans le fichier script.js.
Assurez-vous que apiUrl est défini correctement :

const apiUrl = "http://127.0.0.1:8000/api/doc";


4 : Lancer le serveur frontend

Option 1 : Avec l'extension PHP Server (Visual Studio Code)
Installez l'extension PHP Server de brapifra dans Visual Studio Code.
Faites un clic droit sur index.html et sélectionnez "PHP Server: Serve Project".

Option 2 : Avec un serveur de développement
Démarrez un serveur local :

npm start
ou
yarn start


Par défaut, le frontend sera accessible à l’adresse http://localhost:3000.


5 : Résolution des problèmes courants
Erreur de connexion avec le backend :
Vérifiez que l’URL configurée dans const apiUrl du fichier script.js pointe bien vers le backend.

Problèmes de dépendances :
Mettez à jour Node.js et les modules en exécutant :

npm update


📌 Remarque : La procédure pour déployer le backend se trouve dans le repository dédié au backend. Assurez-vous que le backend fonctionne correctement avant de tester les fonctionnalités du frontend. 😊