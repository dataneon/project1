console.log("running")

const answerButtons = document.querySelector(".answerButtons")

// create object of questions with their answers
const triviaQuestions = [
    {"name": "plant1",
    "family": "plant-family1",
    "imageSource": "img/plant1.jpg"},
    {"name": "plant2",
    "family": "plant-family2",
    "imageSource": "img/plant2.jpg"},
    {"name": "plant3",
    "family": "plant-family3",
    "imageSource": "img/plant3.jpg"},
    {"name": "plant4",
    "family": "plant-family4",
    "imageSource": "img/plant4.jpg"},
    {"name": "plant5",
    "family": "plant-family5",
    "imageSource": "img/plant5.jpg"},
    {"name": "plant6",
    "family": "plant-family6",
    "imageSource": "img/plant6.jpg"},
]

// wrong answers to fill in the other buttons
let wrongAnswers = [
    "Murphy's Oil Soap",
    "Pine",
    "Apples",
    "Rose",
    "Aquinas"
]

// define buttons
const buttonA = document.getElementById("buttonA")
const buttonB = document.getElementById("buttonB")
const buttonC = document.getElementById("buttonC")
const buttonD = document.getElementById("buttonD")
const resetButton = document.getElementById("resetButton")

// event listeners for button clicks
answerButtons.addEventListener("click", userClick)
resetButton.addEventListener("click", reset)


// action to take once a user clicks on an answer
function userClick(e) {
    const currentButton = document.getElementById(e.target.id)

    // only do something if a button is pressed
    if (e.target.tagName == "BUTTON") {
        console.log(`currentButton = ${currentButton.id}`)
    }
}

// reset the game
function reset(e) {
    // reset score
    // reset question counter
    // go to new question
    newQuestion()
    console.log("Reset button pressed")
}

function newQuestion() {
    // define current plantObj
    let randArrIndex = Math.floor(Math.random() * triviaQuestions.length)
    let currentPlant = triviaQuestions[randArrIndex]
    let currentName = currentPlant.name
    let currentImgSrc = currentPlant.imageSource
    let currentFamily = currentPlant.family
    // console.log(currentImgSrc)

    console.log(triviaQuestions[randArrIndex].family)


    // load image
    // load correct answer into one of the buttons
    // load wrong answers into the remaining buttons
}


// get API information


