# Utiliser une image de base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Installer nodemon dans l'environnement global
RUN npm install -g nodemon

# Définir la variable d'environnement par défaut (peut être surchargée au runtime)
ENV NODE_ENV=production

RUN npm install -g nodemon

# Copier le reste des fichiers dans le conteneur
COPY . .

# Utiliser un script shell pour conditionner le démarrage
CMD ["npm", "start"]

