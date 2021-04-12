// define DOM elements
const answerButtons = document.querySelector(".answerButtons")
let currentImage = document.querySelector("#currentPlantImage")
let plantName = document.querySelector("#plantName")

// define object of questions with their answers
const triviaQuestions = [
    {"name": "Pine tree",
    "family": "Pinaceae",
    "imageSource": "img/pine.jpg"},
    {"name": "Palm tree",
    "family": "Arecaceae",
    "imageSource": "img/palm.jpg"},
    {"name": "Joshua tree",
    "family": "Asparagaceae",
    "imageSource": "img/yucca.jpg"},
    {"name": "Baobab tree",
    "family": "Malvaceae",
    "imageSource": "img/baobab.jpg"},
    {"name": "Oak tree",
    "family": "Fagaceae",
    "imageSource": "img/oak.jpg"},
    {"name": "Bog Birch tree",
    "family": "Betulaceae",
    "imageSource": "img/bogbirch.jpg"},
]

// wrong answers to fill in the other buttons
let wrongAnswers = [
    "Murphyfus",
    "Pinaceae",
    "Applicaea",
    "Rosecea",
    "Aquinas",
    "Confucius",
    "Snakephus",
    "Malvaceae",
    "Betulaceae",
    "Asparagaceae",
    "Arecaceae",
]

// define buttons
const buttonA = document.getElementById("buttonA")
const buttonB = document.getElementById("buttonB")
const buttonC = document.getElementById("buttonC")
const buttonD = document.getElementById("buttonD")
const resetButton = document.getElementById("resetButton")
const newQButton = document.getElementById("newQuestion")

// event listeners for button clicks
answerButtons.addEventListener("click", userClick)
resetButton.addEventListener("click", reset)
newQButton.addEventListener("click", newQuestion)

// action to take once a user clicks on an answer
function userClick(e) {
    const currentButton = document.getElementById(e.target.id)

    // print which button has been pressed for dev purposes
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
    // define current plant's attributes
    let randArrIndex = Math.floor(Math.random() * triviaQuestions.length)
    let currentPlant = triviaQuestions[randArrIndex]
    let currentName = currentPlant.name
    let currentImgSrc = currentPlant.imageSource
    let currentFamily = currentPlant.family

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

    // get array of 4 random wrong answers, 4 because one might be identical to correct answer
    fourWrongAnswers = fillCurrentWrongAnswers(wrongAnswers)

    // add wrong answers without overwriting the correct answer
    for (let i = 0; i < answerArray.length; i++) {
        // add a wrong answer if i is null and i is not the answer
        if (answerArray[i] == null && answerArray[i] !== currentFamily) {
            answerArray[i] = fourWrongAnswers[i]
        }
    }

    // populate buttons with the answer array
    fillButtons(answerArray)

    console.log(answerArray)
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

// get API information
