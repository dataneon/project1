// define DOM elements
const answerButtons = document.querySelector(".answerButtons")
let currentImage = document.querySelector("#currentPlantImage")
let plantName = document.querySelector("#plantName")
let scoreSpan = document.querySelector("#scoreSpan")
let scoreNum = 0

// define object of questions with their answers
const triviaQuestions = [
    {"name": "pine tree",
    "family": "Pinaceae",
    "imageSource": "img/pine.jpg"},
    {"name": "palm tree",
    "family": "Arecaceae",
    "imageSource": "img/palm.jpg"},
    {"name": "joshua tree",
    "family": "Asparagaceae",
    "imageSource": "img/yucca.jpg"},
    {"name": "baobab tree",
    "family": "Malvaceae",
    "imageSource": "img/baobab.jpg"},
    {"name": "oak tree",
    "family": "Fagaceae",
    "imageSource": "img/oak.jpg"},
    {"name": "bog birch tree",
    "family": "Betulaceae",
    "imageSource": "img/bogbirch.jpg"},
    {"name": "beavertail pricklypear",
    "family": "Cactaceae",
    "imageSource": "img/beavertail.jpg"},
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
    "Cactaceae",
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

    // get array of 4 random wrong answers, 4 because one might be identical to correct answer
    fourWrongAnswers = fillCurrentWrongAnswers(wrongAnswers)

    // add wrong answers without overwriting the correct answer
    for (let i = 0; i < answerArray.length; i++) {
        // add a wrong answer if i is null and i is not the answer
        // right now this is still adding replicant items
        if (answerArray[i] == null && answerArray[i] !== currentFamily) {
             answerArray[i] = fourWrongAnswers[i]
        }
    }

    // TODO write the above for loop as a recursive function

    // populate buttons with the answer array
    fillButtons(answerArray)
    console.log(answerArray)

    // action to take once a user clicks on an answer
    function userClick(e) {
        const currentButton = document.getElementById(e.target.id)
        // print which button has been pressed for dev purposes
        if (e.target.tagName == "BUTTON") {
            // console.log(`currentButton = ${currentButton.id}`)
            console.log(`currentButton's innerText = ${currentButton.innerText}`)
            if (currentButton.innerText == currentFamily) {
                alert(`correct: ${currentButton.innerText}!`)
                scoreNum += 10
                scoreSpan.innerText = scoreNum
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
