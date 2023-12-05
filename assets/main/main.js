function setList() {
    var list = document.getElementById('list').value.split(",")
    const len = list.length
    if (len > 5) {
        alert("5 elements max bruh")

        return
    }

    for (let i = 0; i < len; i ++) {
        var item = list[i]

        
        if (item.includes(" ")) {
            list[i] = item.replace(/\s/g, '')
        }

        else if (item == "") {
            list.splice(i, 1)
        }
    }

    makeList(list)
}

function setRandList() {
    const max = 100
    const n = 5
    var list = []
    
    for (let i = 0; i < n; i ++) {
        list.push(Math.floor(Math.random() * (max + 1)))
    }

    makeList(list)
}

function makeList(list) {
    const container = document.getElementById("listContainer")

    container.innerHTML = null

    for (let i in list){
        var item = document.createElement("div")
        item.id = "item" + list[i]
        item.classList.add("tester")
        item.innerHTML = list[i]
        item.style.order = i
        container.append(item)
    }
}

// var switchFrames = [
//     { transform: "translate(0px, 0px)" },
//     { transform: "translate(-262px, -50px)" },
//     { transform: "translate(-540px, 0px)"}
// ]

// var switchFrames2 = [
//     { transform: "translate(0px, 0px)" },
//     { transform: "translate(262px, 50px)" },
//     { transform: "translate(540px, 0px)"}
// ]

const switchOptions = {
    duration: 750,
    iterations: 1,
}

document.addEventListener("DOMContentLoaded", (event) => {
    eventListeners()
})





var Animation = function (item1, item2) {
    var r = $.Deferred()

    var listContainer = document.getElementById("listContainer")
    listContainerWidth = listContainer.offsetWidth
    itemDif = item2.style.order - item1.style.order
    itemLength = listContainer.children.length

    var switchFrames = [
        { transform: `translate(0px, 0px)` },
        { transform: `translate(${ listContainerWidth/itemLength * itemDif/2}px, -50px)` },
        { transform: `translate(${ listContainerWidth/itemLength * itemDif}px, 0px)`}
    ]

    var switchFrames2 = [
        { transform: `translate(0px, 0px)` },
        { transform: `translate(${ -listContainerWidth/itemLength * itemDif/2}px, 50px)` },
        { transform: `translate(${ -listContainerWidth/itemLength * itemDif}px, 0px)`}
    ]

    item1.animate(switchFrames, switchOptions)
    item2.animate(switchFrames2, switchOptions)

    setTimeout(function () {
        r.resolve()
    }, 750)

    return r
}

var StyleShift = function (item1, item2, swaps) {
    temp = item1.style.order
    item1.style.order = item2.style.order
    item2.style.order = temp
    swaps.splice(0,2)
    if(swaps != null){
        item1 = document.getElementById(`item${swaps[0]}`)
        item2 = document.getElementById(`item${swaps[1]}`)
        Animation(item1, item2).done(function() {StyleShift(item1, item2, swaps)})
    }
}

function eventListeners() {
    document.getElementById("submit").addEventListener("click", function() {
        setList()
    })

    document.getElementById("randList").addEventListener("click", function() {
        setRandList()
    })

    document.getElementById("list").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            setList()
        }
    })

    document.getElementById("listContainer").addEventListener("click", () => {
        var swaps = [12, 11, 13, 5, 12, 5, 11, 5, 13, 6, 12, 6, 11, 6]
        item1 = document.getElementById(`item${swaps[0]}`)
        item2 = document.getElementById(`item${swaps[1]}`)
        Animation(item1, item2).done(function() {StyleShift(item1, item2, swaps)})
    })

    for (const method of ["bubble", "insertion", "selection", "merge"]) {
        document.getElementById(method).addEventListener("click", function() {
            sort(method)
        })
    }
}

function sort(type) {
    console.log("backend request: sorting with " + type)
}