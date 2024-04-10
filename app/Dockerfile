# Utilisez l'image officielle de Node.js comme base
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers de package.json et de package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances
RUN npm i

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposez le port sur lequel l'application s'exécute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]