# HOT TAKES BACK-END #

## INSTALLATION ##

1. Se positionner à la racine du dossier back
2. Installer nodemon avec la commande `npm install -g nodemon`
3. Lancer la commande `npm install` pour installer les dépendances
4. Créer un fichier `.env` à la racine du dossier back
5. Créer en variables environnement:
    MONGO_URI="mongodb+srv://user:password@host/dbname?retryWrites=true&w=majority"
    JWT_SECRET_KEY="yoursecretkey"

## DEMARRAGE API ##

1. Se positionner à la racine du dossier back
2. Lancer la commande `nodemon server`
    l'API est disponible à l'adresse `http://localhost:3000/`
3. Pour arrêter l'API taper au clavier les touches `ctrl + c`