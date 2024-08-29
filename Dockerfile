# Utilisez une image de Node.js pour construire l'application
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --ignore-scripts

# Copier le reste du code de l'application
COPY . .

# Construire l'application
RUN npm run build

# Utilisez une image Nginx pour servir l'application
FROM nginx:alpine

# Supprimer la configuration Nginx par défaut - éviter les erreurs lors du rafraîchissement
RUN rm /etc/nginx/conf.d/default.conf

# Copier la configuration Nginx personnalisée - éviter les erreurs lors du rafraîchissement
COPY nginx.conf /etc/nginx/conf.d/

# Copier les fichiers build dans le répertoire de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Vérifier si le groupe nginx existe, sinon le créer
RUN getent group nginx || addgroup -S nginx

# Vérifier si l'utilisateur nginx existe, sinon le créer
RUN id -u nginx &>/dev/null || adduser -S nginx -G nginx

# Exposer le port sur lequel Nginx écoutera
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]


