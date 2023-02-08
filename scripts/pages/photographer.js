let price;

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
const openMedia = (src) =>{
    const main = document.querySelector("main")
    const mainHeader = document.querySelector(".mainHeader")
    const mediaLightBox = document.querySelectorAll(".lightBoxContainer img, .lightBoxContainer video ")
    const lightBox = document.querySelector(".lightBox")
    
            mediaLightBox.forEach(mediaHide =>{
                if(mediaHide.src == src)
                {
                    
                    lightBox.classList.toggle("hide")
                    mediaHide.parentNode.classList.toggle("hide")
                    main.classList.toggle("hide")
                    mainHeader.classList.toggle("hide")
                    document.addEventListener('keydown', eventKeyboardLightBox)
                }
                
            })
}

const mediaEvent = () =>{
    const media = document.querySelectorAll(".bloc-media img, .bloc-media video")
    
    media.forEach(mediaCliked =>{
        mediaCliked.addEventListener("click", () => {
            openMedia(mediaCliked.src)
        })    
        
        mediaCliked.addEventListener("keydown",(event) => {
            var code = event.code
            if(code == "Enter")
            {
                openMedia(mediaCliked.src)
            }
        })
    })
}

/**
 * Trie les images.
 * @param {array} resMedia 
 */
const sortMedia = (resMedia,photographers,optionSelected) =>{

    console.log(optionSelected)
        switch (optionSelected)
        {
            case "Popularité" :
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
            case "Date" :
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
            case "Titre" :
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
    totalLikes(photographers);
    updateLikes(photographers);
    nextLightBox();
    prevLightBox();
    closeLightBox();
}

const updateLikes = (photographers) =>{
    const likes = document.querySelectorAll(".likes")
    likes.forEach(element => {
        element.addEventListener("click", function(){
            addLikes(element)
    })
        element.addEventListener("keydown",(event)=>{
            var code = event.code
            if(code == "Enter")
            {
                addLikes(element)
            }
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
    totalLikesBloc.innerHTML = 
    `   <p>
            ${totalLikes}
            <img src="assets/icons/likesBlack.png"></img>
        </p>
        <p>${price}€ / jour</p>
    `
}

const addLikes = (element) =>{
    let currentLikes = element.children[0].innerHTML
            currentLikes = parseInt(currentLikes)
            currentLikes ++;
            element.children[0].innerHTML = currentLikes;
            totalLikes();
}

const closeLightBox = () =>{
    const buttonClose = document.querySelector(".closeButton")
    
    buttonClose.addEventListener("click", eventLightBoxClosed)
   
}
const eventLightBoxClosed = () =>{
    const blocLightBox = document.querySelectorAll(".blocLightBox")
    const lightBox = document.querySelector(".lightBox");
    const main = document.querySelector("main")
    const mainHeader = document.querySelector(".mainHeader")

    blocLightBox.forEach(element => {
        element.classList.add("hide")
    })
    lightBox.classList.add("hide")
    main.classList.remove("hide")
    mainHeader.classList.remove("hide")
    document.removeEventListener('keydown',eventKeyboardLightBox)
}

function eventKeyboardLightBox(event){
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
            if (code == "Escape")
            {
                eventLightBoxClosed()
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

const eventSelect = (resMedia,photographers) =>{

    let option_selected ="Popularité"
    let option1 = "Date"
    let option2 = "Titre"
    const custom_select_closed = document.querySelector(".custom-select-closed")
    const select_option_selected = document.querySelector(".select_option_selected")
    const select_option1 = document.querySelector(".select_option1")
    const select_option2 = document.querySelector(".select_option2")
    const select_option1_text = document.querySelector(".textOP1")
    const select_option2_text = document.querySelector(".textOP2")

    select_option_selected.innerHTML =`${option_selected}<span><img class="select_vector" src="assets/icons/Vector.png" alt="fleche"></span>`
    select_option1_text.innerHTML = `${option1}`
    select_option2_text.innerHTML = `${option2}`

    select_option_selected.addEventListener("click", () => {
        custom_select_closed.classList.toggle("custom-select")
        select_option1.classList.toggle("hide")
        select_option2.classList.toggle("hide")
        const select_vector = document.querySelector(".select_vector")
        select_vector.classList.toggle("select_vector_rotate")
    }) 

    select_option1.addEventListener("click", () => {
        let oldSelected = option_selected
        option_selected = select_option1_text.innerHTML
        select_option_selected.innerHTML =`${option_selected}<span><img class="select_vector" src="assets/icons/Vector.png" alt="fleche"></span>`
        select_option1_text.innerHTML = `${oldSelected}`
        custom_select_closed.classList.toggle("custom-select")
        select_option1.classList.toggle("hide")
        select_option2.classList.toggle("hide")
        sortMedia(resMedia,photographers,option_selected);
        mediaEvent();
    }) 
    select_option2.addEventListener("click", () => {
        let oldSelected = option_selected
        option_selected = select_option2_text.innerHTML
        select_option_selected.innerHTML =`${option_selected}<span><img class="select_vector" src="assets/icons/Vector.png" alt="fleche"></span>`
        select_option2_text.innerHTML = `${oldSelected}`
        custom_select_closed.classList.toggle("custom-select")
        select_option1.classList.toggle("hide")
        select_option2.classList.toggle("hide")
        sortMedia(resMedia,photographers,option_selected);
        mediaEvent();
    })    

    return option_selected
}

const init = async() => {
    const id = getIdPhotographers();
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    const result = photographers.filter(photographer => photographer.id == id );
    const resMedia = media.filter(media => media.photographerId == id );
    price = result[0].price
    displayCard(result[0]);
    sortMedia(resMedia,result[0],eventSelect(resMedia,result[0]));
    mediaEvent();
}

init();