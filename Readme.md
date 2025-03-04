#Monter et build les containers (Express et MongoDb):
docker-compose up --build 

#Monter les container sans build:
docker-compose up

#vider le cache de docker
docker system prune -a

#Pour accéder à swagger-UI via un navigateur:
http://localhost:3000/api-docs/


#Le projet est configuré pour fonctionner avec le debugger de vs-code
#lancer le projet:
npm run dockerStart 

#lancer le debugger:
Debug Docker

#le projet doit être lancé pour que le debugger fonctionne.

#Pour build & run le projet en local avec le .env file pour les variables d'environnement (mais sans la BDD)
docker build -t exemple1 .   
docker run --env-file .env -p 3000:3000 -v %cd%:/app -v /app/node_modules exemple1 