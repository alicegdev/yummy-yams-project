# Utilisez l'image officielle de Node.js comme base
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers de package.json et de package-lock.json dans le conteneur
COPY package.json .
COPY package-lock.json .

# Installez les dépendances
#RUN npm install

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposez le port sur lequel l'API s'exécute
EXPOSE 3001

# Commande pour démarrer l'API
CMD ["node", "api/app.js"] # Assurez-vous de changer app.js par le fichier principal de votre application API

