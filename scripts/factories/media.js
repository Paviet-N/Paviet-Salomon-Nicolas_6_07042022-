
class Image {
    constructor(data)
    {
            this.id = data.id
			this.photographerId = data.photographerId
			this.title = data.title
			this.image = data.image
			this.likes = data.likes
			this.date = data.date
			this.price = data.price
    }

    createHtml(){
        return`
        <div class="bloc-media">
        <img tabindex="6" src="assets/SamplePhotos/${this.photographerId}/${this.image}" alt="${this.title}">
            <div class="info-media">
                <p>${this.title}</p>
                <div tabindex="6" class="likes" aria-label="ajouter un like">
                    <p>${this.likes}</p>
                    <img src="assets/icons/likes.png"></img>
                </div>
            </div>
        </div>
        `
    }
    createLightBox(){
        return`
        
        <div class="blocLightBox hide">
        <img src="assets/SamplePhotos/${this.photographerId}/${this.image}" alt="${this.title}"> 
            <div class="info-media">
                <p>${this.title}</p>
            </div>
        </div>
        `
    }
}

class Video{
    constructor(data)
    {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.video = data.video
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
    }
createHtml(){
    return`
    <div class="bloc-media">
    <video tabindex="6" src="assets/SamplePhotos/${this.photographerId}/${this.video}" alt="${this.title}"></video>
        <div class="info-media">
            <p>${this.title}</p>
            <div tabindex="6" class="likes">
                <p>${this.likes}</p>
                <img src="assets/icons/likes.png"></img>
            </div>
        </div>
    </div>
    `
}
createLightBox(){
    return`
    <div class="blocLightBox hide">
   <video src="assets/SamplePhotos/${this.photographerId}/${this.video}" alt="${this.title}"></video>
        <div class="info-media">
            <p>${this.title}</p>
        </div>
    </div>
    `
}
}

class MediaFactory{
    constructor(media){
        if( media.image == undefined)
        {
            return new Video(media)
        }
        else{
            return new Image(media)
        }
    }
}