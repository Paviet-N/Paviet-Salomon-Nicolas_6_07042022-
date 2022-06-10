const getIdPhotographers = () => {

    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return id;
}

const displayCard = (photographer,resMedia) =>{
        const photographHeader = document.querySelector(".photograph-header");
        const photographMedia = document.querySelector(".photograph-media");
        const photographerCard = new Photographer(photographer);
        const userCardDOM = photographerCard.createHeaderCard();
        photographHeader.innerHTML = userCardDOM;

        resMedia.forEach(element => {
        photographerCard.addMedia(element);
        const userMedia = photographerCard.createMediaHtml();
        photographMedia.innerHTML += userMedia;
        });
        
}

const init = async() => {
    const id = getIdPhotographers();
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();

    const result = photographers.filter(photographer => photographer.id == id );
    const resMedia = media.filter(media => media.photographerId == id );
    displayCard(result[0],resMedia);
}


init();