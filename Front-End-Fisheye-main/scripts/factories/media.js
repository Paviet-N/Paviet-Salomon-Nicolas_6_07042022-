
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
        <img src="../assets/SamplePhotos/${this.photographerId}/${this.image}" alt="${this.title}">
            <div class="info-media">
                <p>${this.title}</p>
                <div class="likes">
                    <p>${this.likes}</p>
                    <i class="far fa-heart" aria-hidden="true"></i>
                </div>
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
    <video src="../assets/SamplePhotos/${this.photographerId}/${this.video}" alt="${this.title}"></video>
        <div class="info-media">
            <p>${this.title}</p>
            <div class="likes">
                <p>${this.likes}</p>
                <i class="far fa-heart" aria-hidden="true"></i>
            </div>
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