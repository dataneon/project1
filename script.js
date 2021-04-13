// define DOM elements
let gameResponse = document.querySelector("#gameResponse")
let answerButtons = document.querySelector(".answerButtons")
let currentImage = document.querySelector("#currentPlantImage")
let plantName = document.querySelector("#plantName")
let scoreSpan = document.querySelector("#scoreSpan")
let currentQuestion = document.querySelector("#currentQuestion")
let questionCountSpan = document.querySelector("#questionCount")
let questionCountHeader = document.querySelector("#questionCountHeader")
let gameOverHeader = document.querySelector("#gameOverHeader")

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
    {"name": "a star fruit tree",
    "family": "Oxalidaceae",
    "imageSource": "img/starfruit.jpg"},
]

// define array of all families
let allFamilies = []
for (let i = 0; i < triviaQuestions.length; i++) {
    allFamilies.push(triviaQuestions[i].family)
}

// define buttons
const buttonA = document.getElementById("buttonA")
const buttonB = document.getElementById("buttonB")
const buttonC = document.getElementById("buttonC")
const buttonD = document.getElementById("buttonD")
const resetButton = document.getElementById("resetButton")
const newQButton = document.getElementById("newQuestion")

// global variables that are altered
let scoreNum = 0
let questionCount = 0
let userHasAnswered = false

// global family name
let famName = ""

// reset the game
function reset(e) {
    // reset score
    scoreNum = 0
    scoreSpan.innerText = scoreNum

    // reset question counter
    questionCount = 0
    questionCountSpan.innerText = questionCount

    // load 10 new questions
    tenQuestions = returnRandomNonidenticalItems(10, triviaQuestions)

    // hide game-over header
    gameOverHeader.innerText = ""

    // show current question and buttons
    currentQuestion.style.visibility = "visible"
    questionCountHeader.style.visibility = "visible"
    answerButtons.style.visibility = "visible"
    newQButton.style.visibility = "visible"

    // call new question
    newQuestion(tenQuestions.pop())
    console.log("Reset button pressed")
}

// choose 10 nonidentical items from trivia object for the game to work through
let tenQuestions = returnRandomNonidenticalItems(10, triviaQuestions)

// function to load next question
function loadNextQuestion(){
    let nextQuestion = tenQuestions.pop()
    return newQuestion(nextQuestion)
}

// get new question, load image, load buttons
function newQuestion(question) {
    famName = ""
    console.log(question)
    // reset game response
    gameResponse.innerText = ``

    // reset userHasAnswered
    userHasAnswered = false

    // add 1 to questionCount
    questionCount += 1
    questionCountSpan.innerText = `${questionCount}`

    // if statement to end the game
    if (questionCount < 11) {
        console.log(`questionCount: ${questionCount}`)
    } else if (questionCount >= 11) {
        console.log("Game over")
        return gameOver()
    }

    // show score
    scoreSpan.innerText = scoreNum

    // define current plant's attributes
    let currentName = question.name
    let currentImgSrc = question.imageSource
    // let currentFamily = question.family
    famName = question.family
    
    console.log(`current family: ${question.family}`)

    // event listeners for button clicks
    answerButtons.addEventListener("click", userClick)
    resetButton.addEventListener("click", reset)
    newQButton.addEventListener("click", loadNextQuestion)

    // load image
    currentImage.src = currentImgSrc

    // load current name of plant into span
    plantName.innerText = currentName

    // create array with 4 nulls
    let answerArray = [null, null, null, null]

    // random num for placement of answer in answerArray
    let randAnsIndex = Math.floor(Math.random() * answerArray.length)

    // place the question's family value randomly in the answerArray
    answerArray[randAnsIndex] = question.family
    console.log(answerArray)

    // array of all families, excluding the question's family
    let allWrongAnswers = allFamilies.filter(str => str != question.family)

    // get array of 4 random wrong answers, 4 because one might be identical to correct answer
    let fourWrongAnswers = returnRandomNonidenticalItems(4, allWrongAnswers)

    // for loop to add fourWrongAnswers into the null spots
    for (let i = 0; i < 4; i++) {
        if (answerArray[i] == question.family) {
            continue
        } else if (answerArray[i] == null) {
            answerArray[i] = fourWrongAnswers.pop()
            console.log(answerArray)
        }
    }

    // function to fill answers buttons
    function fillButtons(answerArr){
        buttonA.innerText = answerArr[0]
        buttonB.innerText = answerArr[1]
        buttonC.innerText = answerArr[2]
        buttonD.innerText = answerArr[3]
    }

    // populate buttons with the answer array
    fillButtons(answerArray)

    // action to take once a user clicks on an answer
    function userClick(e) {
        if (e.target.tagName == "BUTTON") {
            console.log(e.target.innerText)
            if (e.target.innerText == famName && userHasAnswered == false) {
                console.log(`question family = ${question.family}`)
                userHasAnswered = true
                scoreNum += 10
                scoreSpan.innerText = scoreNum
                gameResponse.innerText = `That is correct: ${famName}`
            } else if (e.target.innerText != famName && userHasAnswered == false) {
                userHasAnswered = true
                scoreSpan.innerText = scoreNum
                gameResponse.innerText = `That is incorrect. Correct answer: ${famName}`
                }
            }
        }
    }

// return `amount` of randomly selected, nonidentical items from `myArr`
function returnRandomNonidenticalItems(amount, myArr) {
    function rNon (newArr) {
        if (newArr.length == amount) {
            return newArr
        } else {
            let randIndex = Math.floor(Math.random() * myArr.length)
            let randItem = myArr[randIndex]
            if (newArr.includes(randItem) == false) {
                newArr.push(randItem)
                return rNon(newArr)
            } else if (newArr.includes(randItem) == true) {
                return rNon(newArr)
            }
        }
    }
    return rNon([])
}

// function to end the game, alter the screen
function gameOver(){
    currentImage.src = "img/raintree.gif"
    // hide question and buttons
    currentQuestion.style.visibility = "hidden"
    questionCountHeader.style.visibility = "hidden"
    answerButtons.style.visibility = "hidden"
    newQButton.style.visibility = "hidden"

    gameOverHeader.innerText = "GAME OVER"
}

// load initial question to begin
newQuestion(tenQuestions.pop())
