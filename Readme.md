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

Installation locale
Prérequis
PHP >= 8.0
Composer
Node.js et npm
Serveur MySQL
MongoDB pour les statistiques
Serveur web (Apache, Nginx, ou intégré à Symfony)

Clonez le dépôt GitHub :

bash
Copier le code
git clone https://github.com/votre-utilisateur/zoo-arcadia.git
cd zoo-arcadia


Installez les dépendances backend :

bash
Copier le code
composer install


Configurez les fichiers .env :

Renommez le fichier .env.example en .env.
Configurez les variables comme suit :
env
Copier le code
DATABASE_URL="mysql://arcadia:Arcadia123@127.0.0.1:3306/zoo_arcadia"
MONGODB_URL="mongodb://localhost:27017"
CORS_ALLOW_ORIGIN="http://localhost:8000"

Créez la base de données et appliquez les migrations :

bash
Copier le code
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate



(Optionnel) Importez les données initiales avec les fixtures :

bash
Copier le code
php bin/console doctrine:fixtures:load


Démarrez le serveur Symfony :

bash
Copier le code
symfony serve


Déploiement
Pour déployer l’application :

Configurez un serveur avec PHP 8, MySQL et MongoDB.
Copiez les fichiers du projet sur le serveur.
Configurez le fichier .env pour correspondre à l’environnement de production.
Exécutez les migrations et construisez les assets :
bash
Copier le code
php bin/console doctrine:migrations:migrate
npm run build
Configurez un domaine ou une URL publique.



Technologies utilisées
Frontend : HTML5, CSS3, JavaScript.
Backend : PHP avec Symfony.
Base de données :
Relationnelle : MySQL.
NoSQL : MongoDB.
Déploiement : Compatible avec Fly.io, Heroku, ou autres.
Contributeurs
Développeur principal : Sullivan KOWALSKI
Supervisé par : DevSoft