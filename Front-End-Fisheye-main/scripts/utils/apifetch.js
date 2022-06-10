async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const getData = fetch('data/photographers.json')
    .then(response => response.json())
    .catch(error => {
        console.error('Une erreur est survenue pendant la lecture des données.');
        console.error(error);
    });
    console.log(getData);
    return getData
}