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
                <input type="number" value="0">
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