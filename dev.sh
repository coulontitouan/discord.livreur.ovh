#!/bin/bash

# Nom du conteneur et de l'image
CONTAINER_NAME="discord-web"
IMAGE_NAME="discord-web"

# Vérifier si le conteneur existe déjà
EXISTING_CONTAINER=$(docker ps -aq -f name=$CONTAINER_NAME)

# Si le conteneur existe, l'arrêter et le supprimer
if [ ! -z "$EXISTING_CONTAINER" ]; then
  echo "Arrêt du conteneur existant $CONTAINER_NAME..."
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
else
  echo "Aucun conteneur existant trouvé pour $CONTAINER_NAME."
fi

# Construire la nouvelle image Docker
echo "Construction de l'image Docker $IMAGE_NAME..."
docker build --progress=plain -t $IMAGE_NAME .

# Lancer le nouveau conteneur
echo "Démarrage du nouveau conteneur $CONTAINER_NAME..."
docker run -d -p 8080:80 --name $CONTAINER_NAME $IMAGE_NAME

echo "Le conteneur $CONTAINER_NAME a été remplacé avec succès."
