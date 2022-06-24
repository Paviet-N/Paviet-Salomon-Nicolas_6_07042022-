const getIdPhotographers = () => {

    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return id;
}

const displayCard = (photographer) =>{
        const photographHeader = document.querySelector(".photograph-header");
        
        const photographerCard = new Photographer(photographer);
        const userCardDOM = photographerCard.createHeaderCard();
        photographHeader.innerHTML = userCardDOM;

        
}

const updateGallery = (resMedia) =>{
    const photographMedia = document.querySelector(".photograph-media");
    resMedia.forEach(element => {
        const media = new MediaFactory(element);
        photographMedia.innerHTML += media.createHtml();
        console.log(photographMedia);
        });
}

const init = async() => {
    const id = getIdPhotographers();
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();

    const result = photographers.filter(photographer => photographer.id == id );
    const resMedia = media.filter(media => media.photographerId == id );
    displayCard(result[0]);
    updateGallery(resMedia);
}


init();