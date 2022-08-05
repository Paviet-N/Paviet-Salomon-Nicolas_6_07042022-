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
    const lightBox = document.querySelector(".lightBoxContainer");
    photographMedia.innerHTML = ""
    lightBox.innerHTML = ""
    resMedia.forEach(element => {
        const media = new MediaFactory(element);
        photographMedia.innerHTML += media.createHtml();
        lightBox.innerHTML += media.createLightBox();
        });
}

const mediaEvent = () =>{
    const media = document.querySelectorAll(".bloc-media img, .bloc-media video")
    const main = document.querySelector("main")
    media.forEach(mediaCliked =>{
        mediaCliked.addEventListener("click",() => {
            const mediaLightBox = document.querySelectorAll(".lightBoxContainer img, .lightBoxContainer video ")
            const lightBox = document.querySelector(".lightBox")
            mediaLightBox.forEach(mediaHide =>{
                if(mediaHide.src == mediaCliked.src)
                {
                    lightBox.classList.toggle("hide")
                    mediaHide.parentNode.classList.toggle("hide")
                    main.classList.toggle("hide")
                    document.addEventListener('keydown', nextPicture)
                }
                
            })
        })
    })
}
/**
 * Trie les images.
 * @param {array} resMedia 
 */
const sortMedia = (resMedia) =>{
    const mediaSort = document.querySelector("#media-sort")
  
        switch (mediaSort.value)
        {
            case "popularite" :
                resMedia.sort(function(a,b){
                    if(parseInt(a.likes) < parseInt(b.likes))
                    {
                        return 1;
                    }
                    if(parseInt(a.likes) > parseInt(b.likes))
                    {
                        return - 1;
                    }
                    return 0;
                });
                break;
            case "date" :
                resMedia.sort(function(a,b){
                    if(a.date < b.date)
                    {
                        return 1;
                    }
                    if(a.date > b.date)
                    {
                        return - 1;
                    }
                    return 0;
                });
                break;
            case "title" :
                resMedia.sort(function(a,b){
                    if(a.title.toLowerCase() < b.title.toLowerCase())
                    {
                        return -1;
                    }
                    if(a.title.toLowerCase() > b.title.toLowerCase())
                    {
                        return 1;
                    }
                    return 0;
                });
                break;
    
            default : break;
        }
            
    updateGallery(resMedia);
    updateLikes();
    totalLikes();
    nextLightBox();
    prevLightBox();
    closeLightBox();
}

const updateLikes = () =>{
    const likes = document.querySelectorAll(".likes")
    likes.forEach(element => {
        element.addEventListener("click", function(){
            let currentLikes = element.children[0].innerHTML
            currentLikes = parseInt(currentLikes)
            currentLikes ++;
            element.children[0].innerHTML = currentLikes;
            totalLikes();
    })
    });
}

const totalLikes = () =>{
    const likes = document.querySelectorAll(".likes")
    let totalLikes = 0
    likes.forEach(element => {
       totalLikes += parseInt(element.children[0].innerHTML);
    })
    const totalLikesBloc = document.querySelector(".totalLikes")
    totalLikesBloc.innerHTML = ` <p>${totalLikes}</p>`
}

const closeLightBox = () =>{
    const buttonClose = document.querySelector(".closeButton")
    const blocLightBox = document.querySelectorAll(".blocLightBox")
    const lightBox = document.querySelector(".lightBox");
    const main = document.querySelector("main")

    buttonClose.addEventListener("click", function(){
        blocLightBox.forEach(element => {
            element.classList.add("hide")
        })
        lightBox.classList.add("hide")
        main.classList.remove("hide")
        document.removeEventListener('keydown',nextPicture)
    })

}

function nextPicture(event){
        var code = event.code;
        const blocLightBox = document.querySelectorAll(".blocLightBox")
        if(code == "ArrowRight")
            {
                for (let index = 0; index < blocLightBox.length; index++) {
                    if(!blocLightBox[index].classList.contains("hide") && index != blocLightBox.length - 1)
                    {
                        blocLightBox[index].classList.add("hide")
                        blocLightBox[index+1].classList.remove("hide")
                        return
                    }
                    if(index == blocLightBox.length -1){
                        blocLightBox[index].classList.add("hide")
                        blocLightBox[0].classList.remove("hide")
                    }
                }
                
            }
            if(code == "ArrowLeft")
            {
                for (let index = blocLightBox.length-1 ; index > - 1; index--) {
                    if(!blocLightBox[index].classList.contains("hide") && index != 0)
                    {
                        blocLightBox[index].classList.add("hide")
                        blocLightBox[index-1].classList.remove("hide")
                        return
                    }
                    if(index == 0)
                    {
                        blocLightBox[index].classList.add("hide")
                        blocLightBox[blocLightBox.length-1].classList.remove("hide")
                    }
                }
            }
}

const nextLightBox = () =>{

    const nextButton = document.querySelector(".nextButton")
    const blocLightBox = document.querySelectorAll(".blocLightBox")

    nextButton.addEventListener("click", function(){
        for (let index = 0; index < blocLightBox.length; index++) {
            if(!blocLightBox[index].classList.contains("hide") && index != blocLightBox.length - 1)
            {
                blocLightBox[index].classList.add("hide")
                blocLightBox[index+1].classList.remove("hide")
                return
            }
            if(index == blocLightBox.length -1){
                blocLightBox[index].classList.add("hide")
                blocLightBox[0].classList.remove("hide")
            }
        }
    })

}

const prevLightBox = () =>{
    const prevButton = document.querySelector(".prevButton")
    const blocLightBox = document.querySelectorAll(".blocLightBox")

    prevButton.addEventListener("click", function(){
        for (let index = blocLightBox.length-1 ; index > - 1; index--) {
            if(!blocLightBox[index].classList.contains("hide") && index != 0)
            {
                blocLightBox[index].classList.add("hide")
                blocLightBox[index-1].classList.remove("hide")
                return
            }
            if(index == 0)
            {
                blocLightBox[index].classList.add("hide")
                blocLightBox[blocLightBox.length-1].classList.remove("hide")
            }
        }
    })
}
const displayModal = () =>{
    overlay = document.querySelector(".overlay")
    overlay.classList.remove("hide")
    const photograpersNameModal = document.querySelector(".photographersNameModal")
    const name = document.querySelector(".blocsCard h1").innerHTML
    photograpersNameModal.innerHTML = name
    const buttonSend = document.querySelector(".contact_button")
    buttonSend.addEventListener("click" , (event) => {
        event.preventDefault()
        const firstName = document.querySelector("#firstName").value
        console.log(firstName)
        const name = document.querySelector("#name").value
        console.log(name)
        const email = document.querySelector("#email").value
        console.log(email)
        const message = document.querySelector("#message").value
        console.log(message)
        closeModal()
    } ) 
}

function closeModal() {
    overlay = document.querySelector(".overlay")
    overlay.classList.add("hide")
}


const init = async() => {
    const id = getIdPhotographers();
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    const mediaSort = document.querySelector("#media-sort")
    const result = photographers.filter(photographer => photographer.id == id );
    const resMedia = media.filter(media => media.photographerId == id );
    displayCard(result[0]);
    sortMedia(resMedia);
    mediaEvent();
    mediaSort.addEventListener("change" , () => {sortMedia(resMedia)
                                                mediaEvent()})
}

init();