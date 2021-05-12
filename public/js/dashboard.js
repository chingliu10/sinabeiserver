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
        <div class="propEdit" contentEditable="true">
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