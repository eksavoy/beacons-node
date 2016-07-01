# beaconServer

Ce projet contient le serveur de l'application beaocon app.

Réaliser avec nodeJS il utilise les librairies :
- ExpressJS : lancement du serveur
- Mongodb : api permettant d'utiliser mongo (adresse : < IP-MONGO >:27017, base de donnée : Beacons)

L'ensemble des urls disponibles pour le seveur sont présent sur http://< IP-DU-SERVEUR >/ sur cette page vous trouvez aussi un example de json renvoyé par le serveur.

## Installation

`npm install`

## Lancement

Soit :
- `node server.js`

OU
- `./node_modules/.bin/nodemon server.js`

pour avoir un redémarrage automatique du serveur
