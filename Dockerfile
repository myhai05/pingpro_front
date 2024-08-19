# Utilisez une image de Node.js pour construire l'application
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Construire l'application
RUN npm run build

# Utilisez une image Nginx pour servir l'application
FROM nginx:alpine

# Remove default nginx configuration - eviter les erreurs s du refraishissement
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration - eviter les errurs lors du refraishissement
COPY nginx.conf /etc/nginx/conf.d  

# Copier les fichiers build dans le répertoire de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoutera
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
