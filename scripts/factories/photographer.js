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
            <span class ="infoCity">${this.city},${this.country}</span> <br>
            ${this.tagline} <br>
            <span class ="infoPrice">${this.price}€/jour</span>
        </p>
        </div>
        `
    }

    createHeaderCard(){
        return`
       
            <div tabindex="2" class="blocsCard">
                <h1>${this.name}</h1>
                <p>
                <span class ="infoCityCard">${this.city},${this.country}</span>
                    <br><br>
                    ${this.tagline}
                </p>
            </div>
            <div tabindex="3" class="blocsCard">
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            </div>
            <div tabindex="4" class="blocsCard">
            <img src="../assets/SamplePhotos/PhotographersIDPhotos/${this.portrait}">
            </div>
        
        `
    }

}