# Utiliser l'image officielle Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers du frontend dans le répertoire de travail de Nginx
COPY ./ /usr/share/nginx/html

# Exposer le port 80 pour accéder au site
EXPOSE 80

# Lancer Nginx en mode démon
CMD ["nginx", "-g", "daemon off;"]
