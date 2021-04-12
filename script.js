// define DOM elements
let gameResponse = document.querySelector("#gameResponse")
let answerButtons = document.querySelector(".answerButtons")
let currentImage = document.querySelector("#currentPlantImage")
let plantName = document.querySelector("#plantName")
let scoreSpan = document.querySelector("#scoreSpan")
let scoreNum = 0

// define object of questions with their answers
let triviaQuestions = [
    {"name": "a pine tree",
    "family": "Pinaceae",
    "imageSource": "img/pine.jpg"},
    {"name": "a palm tree",
    "family": "Arecaceae",
    "imageSource": "img/palm.jpg"},
    {"name": "a joshua tree",
    "family": "Asparagaceae",
    "imageSource": "img/yucca.jpg"},
    {"name": "a baobab tree",
    "family": "Malvaceae",
    "imageSource": "img/baobab.jpg"},
    {"name": "an oak tree",
    "family": "Fagaceae",
    "imageSource": "img/oak.jpg"},
    {"name": "a bog birch tree",
    "family": "Betulaceae",
    "imageSource": "img/bogbirch.jpg"},
    {"name": "a poppy",
    "family": "Papaveraceae",
    "imageSource": "img/poppy.jpg"},
    {"name": "a bamboo tree",
    "family": "Poaceae",
    "imageSource": "img/bamboo.jpg"},
    {"name": "wisteria",
    "family": "Fabaceae",
    "imageSource": "img/wisteria.jpg"},
    {"name": "rainbow eucalyptus",
    "family": "Myrtaceae",
    "imageSource": "img/eucalyptus.jpg"},
    {"name": "a willow tree",
    "family": "Salicaceae",
    "imageSource": "img/willow.jpg"},
    {"name": "a maple tree",
    "family": "Sapindaceae",
    "imageSource": "img/maple.jpg"},
    {"name": "poison ivy",
    "family": "Anacardiaceae",
    "imageSource": "img/poisonivy.jpg"},
    {"name": "aloe",
    "family": "Asphodelaceae",
    "imageSource": "img/aloe.jpg"},
    {"name": "a jade plant",
    "family": "Crassulaceae",
    "imageSource": "img/jade.jpg"},
    {"name": "the Osage orange",
    "family": "Moraceae",
    "imageSource": "img/osage.jpg"},
    {"name": "a grapevine",
    "family": "Vitaceae",
    "imageSource": "img/grapes.jpg"},
    {"name": "an apple tree",
    "family": "Rosaceae",
    "imageSource": "img/apple.jpg"},
    {"name": "a watermelon plant",
    "family": "Cucurbitaceae",
    "imageSource": "img/watermelon.jpg"},
    {"name": "star fruit tree",
    "family": "Oxalidaceae",
    "imageSource": "img/starfruit.jpg"},
]

// wrong answers to fill in the other buttons
let wrongAnswers = [
    "Murphyfus",
    "Pinaceae",
    "Applicaea",
    "Aquinas",
    "Confucius",
    "Snakephus",
    "Malvaceae",
    "Betulaceae",
    "Asparagaceae",
    "Arecaceae",
    "Cactaceae",
    "Papaveraceae",
    "Poaceae",
    "Fabaceae",
    "Myrtaceae",
    "Salicaceae",
    "Sapindaceae",
    "Anacardiaceae",
]

// define buttons
const buttonA = document.getElementById("buttonA")
const buttonB = document.getElementById("buttonB")
const buttonC = document.getElementById("buttonC")
const buttonD = document.getElementById("buttonD")
const resetButton = document.getElementById("resetButton")
const newQButton = document.getElementById("newQuestion")

// event listeners for button clicks
resetButton.addEventListener("click", reset)
newQButton.addEventListener("click", newQuestion)

// reset the game
function reset(e) {
    // reset score
    // reset question counter
    // go to new question
    newQuestion()
    console.log("Reset button pressed")
}

// choose 10 nonidentical items from trivia object for the game to work through
let tenQuestions = []

// get new question, load image, load buttons

function newQuestion() {

    // define current plant's attributes
    let randArrIndex = Math.floor(Math.random() * triviaQuestions.length)
    let currentPlant = triviaQuestions[randArrIndex]
    let currentName = currentPlant.name
    let currentImgSrc = currentPlant.imageSource
    let currentFamily = currentPlant.family
    console.log(`current family: ${currentFamily}`)

    // event listener for answerButtons
    answerButtons.addEventListener("click", userClick)

    // load image
    currentImage.src = currentImgSrc

    // load current name of plant into span
    plantName.innerText = currentName

    // create array with 4 nulls
    let answerArray = [null, null, null, null]

    // random num for placement of answer in answerArray
    let randAnsIndex = Math.floor(Math.random() * answerArray.length)

    // place the currentFamily variable randomly in the answerArray
    answerArray[randAnsIndex] = currentFamily
    console.log(answerArray)

    // get array of 4 random wrong answers, 4 because one might be identical to correct answer
    let fourWrongAnswers = fillCurrentWrongAnswers(wrongAnswers)

    // the wrong answers could also be gathered by getting all the family names
    // and excluding the name of the current plant

    // define array of wrong answers that does not include the answer
    let filteredWrongAnswers = fourWrongAnswers.filter(str => str != currentFamily)

    // for loop to add filteredWrongAnswers into the null spots
    for (let i = 0; i < 4; i++) {
        if (answerArray[i] == currentFamily) {
            continue
        } else if (answerArray[i] == null) {
            answerArray[i] = filteredWrongAnswers.pop()
            console.log(answerArray)
        }
    }

    // populate buttons with the answer array
    fillButtons(answerArray)

    // action to take once a user clicks on an answer
    function userClick(e) {
        let currentButton = document.getElementById(e.target.id)
        if (e.target.tagName == "BUTTON") {
            console.log(`currentButton's innerText = ${currentButton.innerText}`)
            if (currentButton.innerText == currentFamily) {
               alert(`correct: ${currentButton.innerText}!`)
                scoreNum += 10
                scoreSpan.innerText = scoreNum
                // return newQuestion()
                // for some reason the program is remembering the previous currentFamily
            } else if (currentButton.innerText != currentFamily) {
                alert(`Incorrect. The correct answer is ${currentFamily}`)
                // return newQuestion()
                }
            }
        }
    }

// fill answers buttons
function fillButtons(answerArr){
    buttonA.innerText = answerArr[0]
    buttonB.innerText = answerArr[1]
    buttonC.innerText = answerArr[2]
    buttonD.innerText = answerArr[3]
}

// return 4 nonidentical incorrect answers using wrongsArr argument
// 4 because one might be identical to correct answer
function fillCurrentWrongAnswers(wrongsArr){
    function rFour (newArr) {
        if (newArr.length == 4) {
            return newArr
        } else {
            let randIndex = Math.floor(Math.random() * wrongsArr.length)
            let randItem = wrongsArr[randIndex]
            if (newArr.includes(randItem) == false) {
                newArr.push(randItem)
                return rFour(newArr)
            } else if (newArr.includes(randItem) == true) {
                return rFour(newArr) 
            } else {
                console.log("something went wrong")
            }
        }
    }
    return rFour([])
}

// load initial question to begin
newQuestion()
