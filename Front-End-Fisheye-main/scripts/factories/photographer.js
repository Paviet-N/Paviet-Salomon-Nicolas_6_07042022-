/*function photographerFactory(data) {
    const { name,id,city,country,tagline,price,portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name,id,city,country,tagline,price,portrait, getUserCardDOM }
}*/

class Photographer{
    constructor(data){
        this.name = data.name
        this.id = data.id
        this.city = data.city
        this.country = data.country
        this.tagline = data.tagline
        this.price = data.price
        this.portrait = data.portrait

    }
    addMedia (media){
        this.image = media.image
        if(!media.image)
        {
            this.image = media.video
        }
        this.title = media.title
        this.likes = media.likes
    }

    createHtml(){
        return `
        <div>
        <a href ="photographer.html?id=${this.id}">
        <article>
            <img src="../assets/SamplePhotos/PhotographersIDPhotos/${this.portrait}">
            <h2>${this.name}</h2>
        </article>
        </a>
        <p>
        ${this.city}
        </p>
        </div>
        `
    }

    createHeaderCard(){
        return`
       
            <div class="blocsCard">
                <h1>${this.name}</h1>
                <p>
                    ${this.city},${this.country}
                    <br>
                    ${this.tagline}
                </p>
            </div>
            <div class="blocsCard">
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            </div>
            <div class="blocsCard">
            <img src="../assets/SamplePhotos/PhotographersIDPhotos/${this.portrait}">
            </div>
        
        `
    }

    createMediaHtml(){
        return`
        <div class="bloc-media">
        <img src="../assets/SamplePhotos/${this.name}/${this.image}">
            <div class="info-media">
                <p>${this.title}</p>
                <div class="likes">
                    <p>${this.likes}</p>
                    <i class="fa-solid fa-heart"></i>
                </div>
            </div>
        </div>
        `
    }
}