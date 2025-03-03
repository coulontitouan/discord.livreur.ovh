# Nom du conteneur et de l'image
$containerName = "discord-web"
$imageName = "discord-web"

# Vérifier si le conteneur existe déjà
$existingContainer = docker ps -aq -f "name=$containerName"

# Si le conteneur existe, l'arrêter et le supprimer
if ($existingContainer) {
    Write-Host "Arret du conteneur existant $containerName..."
    docker stop $containerName
    docker rm $containerName
} else {
    Write-Host "Aucun conteneur existant trouve pour $containerName."
}

# Construire la nouvelle image Docker
Write-Host "Construction de l'image Docker $imageName..."
docker build --progress=plain -t $imageName .

# Lancer le nouveau conteneur
Write-Host "Demarrage du nouveau conteneur $containerName..."
docker run -d -p 8080:80 --name $containerName $imageName

Write-Host "Le conteneur $containerName a ete remplace avec succes."
