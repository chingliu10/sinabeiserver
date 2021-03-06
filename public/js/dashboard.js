let checkBoxes = document.querySelectorAll(".squize")

checkBoxes.forEach(function (e) {
    e.addEventListener("change", function(event) {
        
        if (event.target.checked === true) {
            //addContent
            addProps(event.target.defaultValue)
        }
        else {
            //remove content if true
            removeProps(event.target.defaultValue)
        }
    })
})

let properties = document.querySelector(".properties")
function addProps(title){
    let propDiv = document.createElement("div")
    properties.appendChild(propDiv)
    propDiv.setAttribute("class", title)
    propDiv.innerHTML = `
        <label>add ${title}'s</label>
        <div class="propEdit" contentEditable="true" onkeydown="changeEditable(event)" data-title="${title}">
        </div>
    `
}


function removeProps(title){

    let getChildren = properties.children

    for (let x = 0; x < getChildren.length; x++) {
        
        if (getChildren[x].className === title) {

            getChildren[x].remove()
            return true
        
        }

    }

}


let colors
let sizes

function changeEditable (x) {

    let value = x.target.textContent
    let prop = x.target.getAttribute("data-title")

    if (x.keyCode === 188){

        
        if (prop === "color") {

            colors = value.split(",")
            calculateMixing()

        } 

        else {

            sizes = value.split(",")
            calculateMixing()

        }

    }
}

// function getPropDivContent(x){
//     console.log(x)


let printProps = document.querySelector(".printProps")
function calculateMixing() {

        if (colors !== undefined && sizes === undefined) {
            clearPrint(colors)
        }

        if (sizes !== undefined && colors === undefined){
            clearPrint(sizes)
        }

        if (Array.isArray(sizes) && Array.isArray(colors)){
            createMegaArray(sizes, colors)
        }



}


function clearPrint (prop) {


        if ( printProps.children.length  === 0 ){
            //no clearing
            printProperties(prop)
        }

        else {
   
            clearing()
            printProperties(prop)

        }

}


function clearing(){

  
    let propWrapper = document.querySelectorAll(".attrib")
    for (let x = 0; x < propWrapper.length; x++){
        propWrapper[x].parentElement.removeChild(propWrapper[x])
    }
    // console.log(propWrapper[0].parentElement)

}

function printProperties (p) {
    

    for (let z = 0; z < p.length ; z++) {

        let div = document.createElement("div")
        printProps.appendChild(div)
        div.setAttribute("class", "attrib")
        div.innerHTML = `
            <div>
                <label>${p[z]}</label>
                <input type="number" value="0" class="propTotal">
            </div>
        `
    }

}

function createMegaArray(x, y) {

    let megaArray = []
    for (let outer = 0; outer < x.length; outer++) {
    
        for (let inner = 0; inner < y.length; inner++) {
            let attribute = `${x[outer]}/${y[inner]}`.trim()
            megaArray.push(attribute)
        }

    }

    clearing()
    printProperties(megaArray)

}



//file upload

document.querySelector(".uploadFile").addEventListener("click", function(e) {
    e.preventDefault()
    document.querySelector(".uploadButton").click()
})

document.querySelector(".uploadButton").addEventListener("change", function (e) {
    console.log("file has being added")
    var file = this.files[0]
    let form = document.querySelector(".uploadForm")
    let formData = new FormData()
    formData.append("imageUpload", file)
    //loading effect should be here
    createTempDiv()
    fetch(`/dashboard/upload`, {
        method : "post",
        body: formData
    })
    .then((res) => res.json())
    .then((out) => {
        //loading effect should end here
        let filePath = out.data
        console.log(filePath)
        renderTheUploadedImage(filePath.slice(6, filePath.length))
    })
})

let imageGallery = document.querySelector(".imageGallery")
let count = 0
function renderTheUploadedImage (imgUrl) {
    document.querySelector(".loading").remove()
    let div = document.createElement("div")
    imageGallery.appendChild(div)
    div.innerHTML = `
        <div class="imgUploadWrapper">
            <span class="deleteImage" onClick="deleteImage(event)">x</span>
            <img src="${imgUrl}" class="actualImage">
        </div>
    `

}

function createTempDiv() {
    div = document.createElement("div")
    imageGallery.appendChild(div)
    div.setAttribute("class", "loading image")
    div.textContent = "Uploading Image..."
}



function deleteImage(el) {

    let imageUrl = el.target.parentElement.children[1].getAttribute("src")
    console.log(imageUrl)
    fetch(`/dashboard/deleteimage${imageUrl.slice(7, imageUrl.length)}`)
    .then(response => response.text())
    .then((out) =>{
        // let removeDiv = el.target.parentElement.parentElement.remove()
        console.log(out)
    })
   

}

//submitting the main form
document.querySelector(".mainSubmitForm").addEventListener("click", function(event) {
    event.preventDefault()
    let mainForm = document.querySelector(".mainForm")
    let formDetails = new FormData(mainForm)
    
    let formData = {}
    let attributes = getMixings(colors , sizes)
    let values = getPropValues()
    let images = getImages()
    for(let x of formDetails.keys()) {
        
        formData[x] = formDetails.get(x)
    }
    formData["attributes"] = attributes
    formData["values"] = values
    formData["images"] = images
    //send the main form
    sendFormData(formData)
    
})


function getMixings(colors, sizes) {
    
    if(colors !== undefined && sizes !== undefined){
        //create the mixing array
        return [
            colors, sizes
        ]
    }
    if(colors !== undefined){
        //we get only colors
        return {

            color : colors

        }
    }
    if(sizes !== undefined){
        //we get sizes
        return  {
            size : sizes
        }
    }

    //else
    //color is none and size are none
}

function  getPropValues() {
    let values = document.querySelectorAll(".propTotal")
    let attribValue = []
    values.forEach(function(element) {
        attribValue.push(element.value)
    })

    return attribValue
}


function getImages () {
    let allImages = document.querySelectorAll(".actualImage")
    let images = []

    allImages.forEach(function(element) {
        images.push(element.getAttribute("src"))
    })

    return images

}
function sendFormData (form) {

    fetch(`/dashboard/create`, {
        method : "post",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(form)
    }).then(res=> res.text())
    .then((out) => {

        console.log(out)

    })

}